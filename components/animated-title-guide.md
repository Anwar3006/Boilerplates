# Animated Title Component Guide

A reusable animated title component that reveals text with smooth 3D transforms triggered by scroll position.

## Dependencies

Install the following dependencies in your React project:

```bash
npm install react gsap
```

### Package Details:

- **react**: Core React library
- **gsap**: GreenSock Animation Platform with ScrollTrigger plugin for scroll-based animations

## Styles

Add these custom CSS classes to your stylesheet:

```css
.animated-title {
  @apply flex flex-col gap-1 text-7xl uppercase leading-[.8] text-white sm:px-32 md:text-[6rem];
  font-family: "Zentry";

  & b {
    font-family: "Zentry";
    font-feature-settings: "ss01" on;
  }
}

.animated-word {
  @apply font-black opacity-0;
  font-family: "Zentry";
  transform: translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg);
  transform-origin: 50% 50% -150px !important;
  will-change: opacity, transform;

  & b {
    font-family: "Zentry";
    font-feature-settings: "ss01" on;
  }
}
```

## Component Code

```jsx
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
```

## Animation Guide

### useRef Hook Usage

**containerRef**:

- **Purpose**: Creates a reference to the main container div
- **Why**: GSAP's ScrollTrigger needs a DOM element to watch for scroll position
- **Usage**: Used as both the trigger element and the context for GSAP animations

### GSAP Animation Implementation

The component uses several advanced GSAP features:

#### 1. GSAP Context

```jsx
const ctx = gsap.context(() => {
  // Animation code here
}, containerRef);
```

**What it does:**

- Creates a scoped animation context tied to the container element
- Ensures animations only affect elements within this container
- Automatically handles cleanup when component unmounts

#### 2. ScrollTrigger Configuration

```jsx
scrollTrigger: {
  trigger: containerRef.current,
  start: "100 bottom",
  end: "center bottom",
  toggleActions: "play none none reverse",
}
```

**Parameters explained:**

- **trigger**: The element that triggers the animation (our container)
- **start: "100 bottom"**: Animation starts when the element is 100px from the bottom of viewport
- **end: "center bottom"**: Animation completes when element center reaches viewport bottom
- **toggleActions**: "play none none reverse" means:
  - Play when entering trigger zone
  - Do nothing when leaving forward
  - Do nothing when re-entering backward
  - Reverse when leaving backward

#### 3. Staggered Animation

```jsx
titleAnimation.to(".animated-word", {
  opacity: 1,
  transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
  ease: "power2.inOut",
  stagger: 0.02,
});
```

**How it works:**

- **Target**: All elements with `.animated-word` class within the context
- **Initial state**: Words start with opacity 0 and 3D transforms (set in CSS)
- **Final state**: Words animate to full opacity and neutral transform
- **stagger: 0.02**: Each word animates 0.02 seconds after the previous one
- **ease**: Smooth easing curve for natural motion

### Text Processing Logic

The component intelligently handles text formatting:

1. **Line breaks**: Splits title by `<br />` tags to create separate lines
2. **Word separation**: Splits each line by spaces to create individual animated words
3. **HTML support**: Uses `dangerouslySetInnerHTML` to support HTML tags like `<b>`, `<i>`, etc.

## Usage Examples

### Basic Usage

```jsx
<AnimatedTitle
  title="Welcome to the <b>Future</b>"
  containerClass="text-center text-4xl font-bold"
/>
```

### Multi-line Title

```jsx
<AnimatedTitle
  title="Discover <b>Amazing</b><br />Digital Experiences"
  containerClass="text-center text-6xl font-extrabold text-white"
/>
```

### With HTML Formatting

```jsx
<AnimatedTitle
  title="<i>Innovative</i> Solutions<br />for <b>Modern</b> Problems"
  containerClass="text-left text-5xl"
/>
```

## Customization Options

### Animation Timing

Adjust the stagger delay for different reveal speeds:

```jsx
stagger: 0.05, // Slower reveal
stagger: 0.01, // Faster reveal
```

### Scroll Trigger Points

Modify when the animation starts:

```jsx
start: "top bottom",    // Start when element top hits viewport bottom
start: "50% bottom",    // Start when element middle hits viewport bottom
start: "bottom bottom", // Start when element bottom hits viewport bottom
```

### Transform Effects

Change the initial transform in CSS for different entrance effects:

```css
.animated-word {
  /* Slide up effect */
  transform: translate3d(0, 100px, 0);

  /* Rotate effect */
  transform: rotateZ(45deg);

  /* Scale effect */
  transform: scale(0.5);

  /* Combined effects */
  transform: translate3d(-50px, 50px, 0) rotateY(45deg) scale(0.8);
}
```

### Easing Options

Different easing functions for various feels:

```jsx
ease: "back.out(1.7)",    // Bouncy
ease: "elastic.out(1,0.3)", // Elastic
ease: "power4.out",       // Strong easing
ease: "none",             // Linear
```

## Performance Considerations

1. **GSAP Context**: Automatically cleans up animations when component unmounts
2. **Hardware Acceleration**: Uses `translate3d()` for GPU acceleration
3. **Efficient Targeting**: Uses class selectors instead of individual refs
4. **Scroll Optimization**: ScrollTrigger is optimized for scroll performance

## Accessibility Notes

- The component preserves semantic HTML structure
- Screen readers will read the text naturally
- Consider adding `aria-label` for complex HTML formatting
- Animation respects `prefers-reduced-motion` when implemented in CSS

## Browser Support

- Modern browsers with CSS transform support
- Fallback: Text displays normally without animation in older browsers
- GSAP provides excellent cross-browser compatibility

## Troubleshooting

**Animation not triggering:**

- Ensure ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
- Check if container has proper height/visibility
- Verify scroll trigger start/end points

**Words not animating:**

- Confirm `.animated-word` CSS is applied
- Check if GSAP context is properly scoped
- Ensure component is mounted when animation runs
