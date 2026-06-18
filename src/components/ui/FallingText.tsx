import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/FallingText.css";

type FallingTextTrigger = "click" | "hover" | "auto" | "scroll";

export type FallingTextSegment = {
  text: string;
  wordClass?: string;
  breakAfter?: boolean;
};

type FallingTextProps = {
  className?: string;
  text?: string;
  /** Styled blocks — each segment keeps its own word styling (overrides `text`). */
  segments?: FallingTextSegment[];
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: FallingTextTrigger;
  /** When true, starts the fall animation (e.g. wired to an external button). */
  started?: boolean;
  /** Use the full screen for physics instead of the local container. */
  fullViewport?: boolean;
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
};

const buildWordHTML = (
  word: string,
  wordClass: string,
  highlightWords: string[],
  highlightClass: string,
) => {
  const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
  const classes = ["word", wordClass, isHighlighted ? highlightClass : ""]
    .filter(Boolean)
    .join(" ");

  return `<span class="${classes}">${word}</span>`;
};

const FallingText = ({
  className = "",
  text = "",
  segments,
  highlightWords = [],
  highlightClass = "falling-text-highlight",
  trigger = "click",
  started = false,
  fullViewport = false,
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const wordsHostRef = useRef<HTMLDivElement>(null);

  const [userTriggered, setUserTriggered] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);

  const effectStarted =
    started || userTriggered || scrollTriggered || trigger === "auto";

  useEffect(() => {
    if (!textRef.current) return;

    const segmentList = segments ?? (text ? [{ text, wordClass: "" }] : []);

    const parts: string[] = [];

    segmentList.forEach((segment, segmentIndex) => {
      segment.text
        .split(" ")
        .filter(Boolean)
        .forEach((word) => {
          parts.push(
            buildWordHTML(
              word,
              segment.wordClass ?? "",
              highlightWords,
              highlightClass,
            ),
          );
        });

      if (segment.breakAfter && segmentIndex < segmentList.length - 1) {
        parts.push(
          '<span class="falling-text-line-break" aria-hidden="true"></span>',
        );
      }
    });

    textRef.current.innerHTML = parts.join(" ");
  }, [text, segments, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger !== "scroll" || !containerRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrollTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !textRef.current) return;

    let animationId = 0;
    let cancelled = false;
    let teardown: (() => void) | undefined;

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled || !textRef.current) return;

        const layoutContainer = containerRef.current;
        const canvasContainer = canvasContainerRef.current;
        const wordsHost = wordsHostRef.current;
        if (!canvasContainer || (!fullViewport && !layoutContainer)) return;
        if (fullViewport && !wordsHost) return;

        const {
          Engine,
          Render,
          World,
          Bodies,
          Runner,
          Mouse,
          MouseConstraint,
        } = Matter;

        const width = fullViewport
          ? window.innerWidth
          : layoutContainer!.getBoundingClientRect().width;
        const height = fullViewport
          ? window.innerHeight
          : layoutContainer!.getBoundingClientRect().height;

        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.gravity.y = gravity;

        const render = Render.create({
          element: canvasContainer,
          engine,
          options: {
            width,
            height,
            background: backgroundColor,
            wireframes,
          },
        });

        const boundaryOptions = {
          isStatic: true,
          render: { fillStyle: "transparent" },
        };
        const floor = Bodies.rectangle(
          width / 2,
          height + 25,
          width,
          50,
          boundaryOptions,
        );
        const leftWall = Bodies.rectangle(
          -25,
          height / 2,
          50,
          height,
          boundaryOptions,
        );
        const rightWall = Bodies.rectangle(
          width + 25,
          height / 2,
          50,
          height,
          boundaryOptions,
        );
        const ceiling = Bodies.rectangle(
          width / 2,
          -25,
          width,
          50,
          boundaryOptions,
        );

        const localRect = layoutContainer?.getBoundingClientRect() ?? {
          left: 0,
          top: 0,
        };

        const wordSpans =
          textRef.current.querySelectorAll<HTMLSpanElement>(".word");

        if (wordSpans.length === 0) return;

        const wordBodies = Array.from(wordSpans).map((elem) => {
          const rect = elem.getBoundingClientRect();

          const x = fullViewport
            ? rect.left + rect.width / 2
            : rect.left - localRect.left + rect.width / 2;
          const y = fullViewport
            ? rect.top + rect.height / 2
            : rect.top - localRect.top + rect.height / 2;

          const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            render: { fillStyle: "transparent" },
            restitution: 0.8,
            frictionAir: 0.01,
            friction: 0.2,
          });

          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 5,
            y: 0,
          });
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

          return { elem, body };
        });

        wordBodies.forEach(({ elem, body }) => {
          if (fullViewport) {
            wordsHost!.appendChild(elem);
          }

          elem.classList.add(
            fullViewport
              ? "falling-text-word--viewport"
              : "falling-text-word--local",
          );
          elem.style.position = fullViewport ? "absolute" : "absolute";
          elem.style.left = `${body.position.x}px`;
          elem.style.top = `${body.position.y}px`;
          elem.style.transform = "translate(-50%, -50%)";
        });

        const mouseTarget = fullViewport ? document.body : layoutContainer!;
        const mouse = Mouse.create(mouseTarget);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: mouseConstraintStiffness,
            render: { visible: false },
          },
        });
        render.mouse = mouse;

        if (fullViewport) {
          mouse.element.style.touchAction = "none";
        }

        World.add(engine.world, [
          floor,
          leftWall,
          rightWall,
          ceiling,
          mouseConstraint,
          ...wordBodies.map((wb) => wb.body),
        ]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        const updateLoop = () => {
          wordBodies.forEach(({ body, elem }) => {
            const { x, y } = body.position;
            elem.style.left = `${x}px`;
            elem.style.top = `${y}px`;
            elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
          });
          Matter.Engine.update(engine);
          animationId = requestAnimationFrame(updateLoop);
        };

        updateLoop();

        teardown = () => {
          cancelAnimationFrame(animationId);
          Render.stop(render);
          Runner.stop(runner);
          if (fullViewport) {
            Matter.Mouse.clearSourceEvents(mouse);
          }
          if (render.canvas && canvasContainer) {
            canvasContainer.removeChild(render.canvas);
          }
          World.clear(engine.world, false);
          Engine.clear(engine);
          wordBodies.forEach(({ elem }) => {
            elem.classList.remove(
              "falling-text-word--viewport",
              "falling-text-word--local",
            );
            elem.style.cssText = "";
            textRef.current?.appendChild(elem);
          });
        };
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      teardown?.();
    };
  }, [
    effectStarted,
    fullViewport,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!userTriggered && (trigger === "click" || trigger === "hover")) {
      setUserTriggered(true);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`falling-text-container ${fullViewport ? "falling-text-container--viewport" : ""} ${className}`}
        onClick={trigger === "click" ? handleTrigger : undefined}
        onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
        style={{
          overflow: fullViewport ? "visible" : "hidden",
        }}
      >
        <div
          ref={textRef}
          className="falling-text-target"
          style={segments ? undefined : { fontSize, lineHeight: 1.4 }}
        />
        {!fullViewport ? (
          <div ref={canvasContainerRef} className="falling-text-canvas" />
        ) : null}
      </div>

      {fullViewport &&
        createPortal(
          <div aria-hidden className="falling-text-viewport-layer">
            <div
              ref={canvasContainerRef}
              className="falling-text-viewport-canvas"
            />
            <div ref={wordsHostRef} className="falling-text-words-host" />
          </div>,
          document.body,
        )}
    </>
  );
};

export default FallingText;
