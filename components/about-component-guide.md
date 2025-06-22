# Reusable About Section Component Guide

A comprehensive guide to implementing an animated about section with scroll-triggered clip-path animations and smooth text reveals.

## Dependencies

Install the following dependencies in your React project:

```bash
npm install react gsap @gsap/react
```

### Package Details:

- **react**: Core React library
- **gsap**: GreenSock Animation Platform for animations
- **@gsap/react**: Official GSAP React integration with useGSAP hook
- **ScrollTrigger**: GSAP plugin for scroll-based animations (comes with GSAP)

## Required Files

Ensure you have these files/components in your project:

1. **AnimatedTitle Component**: `./AnimatedTitle` - A component for animated text reveals
2. **Background Image**: `img/about.webp` - Your section background image
3. **CSS Styles**: Custom styles (see Styles section below)

## Styles

Add these custom CSS classes to your stylesheet:

```css
@theme {
  --font-general: "general", sans-serif;
  --font-robert-regular: "robert-regular", sans-serif;
}

.mask-clip-path {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.about-image {
  @apply absolute left-1/2 top-0 z-20 h-[60vh] w-96 origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw];
}

.about-subtext {
  @apply absolute bottom-[-80dvh] left-1/2 w-full max-w-96 -translate-x-1/2 text-center text-lg md:max-w-[34rem];
  font-family: "Circular Web";
}
```

## Component Code

```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure"
          containerClass={"mt-5 !text-black text-center"}
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
```

## Animation Guide

### useGSAP Hook Usage

The component uses the `useGSAP` hook from `@gsap/react`:

**Why useGSAP instead of useEffect?**

- **Automatic cleanup**: Handles GSAP animation cleanup when component unmounts
- **Better performance**: Optimized for GSAP animations in React
- **Context awareness**: Automatically handles GSAP context and scope

### GSAP Timeline and ScrollTrigger Implementation

The component creates a sophisticated scroll-triggered animation:

```jsx
const clipAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: "#clip",
    start: "center center",
    end: "+=800 center",
    scrub: 0.5,
    pin: true,
    pinSpacing: true,
  },
});
```

**How it works:**

1. **gsap.timeline()**: Creates a timeline for sequenced animations
2. **ScrollTrigger Configuration**:
   - **trigger: "#clip"**: Element that triggers the animation
   - **start: "center center"**: Animation starts when trigger's center hits viewport center
   - **end: "+=800 center"**: Animation ends 800px after start point
   - **scrub: 0.5**: Links animation progress to scroll position (0.5 = slight lag)
   - **pin: true**: Pins the element during animation
   - **pinSpacing: true**: Maintains layout spacing while pinned

### Clip-Path Animation

The main animation transforms a small circular mask into a full-screen reveal:

```jsx
clipAnimation.to(".mask-clip-path", {
  width: "100vw",
  height: "100vh",
  borderRadius: 0,
});
```

**Animation Flow:**

1. **Initial State**: Small rounded rectangle (20x20) with circular clip-path
2. **Final State**: Full viewport size (100vw x 100vh) with no border radius
3. **Effect**: Creates a smooth "zoom out" reveal of the background image

### CSS Clip-Path Integration

The CSS and GSAP work together:

- **CSS**: Sets initial clip-path shape (`circle(10%)`)
- **GSAP**: Animates size and border-radius properties
- **Result**: Smooth transition from small circle to full screen

## ScrollTrigger Concepts Explained

### Pin Effect

- **Purpose**: Keeps the element in view during scroll
- **Visual**: Element appears "stuck" while user scrolls
- **Use Case**: Perfect for reveal animations that need time to complete

### Scrub Animation

- **scrub: 0.5**: Animation progress tied to scroll position with slight delay
- **scrub: true**: Immediate response to scroll
- **scrub: 1**: More delayed response
- **Effect**: Creates smooth, controllable animations

### Start/End Points

- **Syntax**: `"elementPosition viewportPosition"`
- **Examples**:
  - `"top bottom"`: When element's top hits viewport bottom
  - `"center center"`: When element's center hits viewport center
  - `"+=800"`: 800px relative to start point

## Customization Options

### Animation Duration

Adjust the scroll distance for animation:

```jsx
end: "+=1200 center", // Longer animation distance
```

### Animation Speed

Modify the scrub value:

```jsx
scrub: 1, // Slower response
scrub: 0.1, // Faster response
```

### Clip-Path Shape

Change the initial CSS clip-path:

```css
.mask-clip-path {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%); /* Triangle */
  clip-path: ellipse(25% 40% at 50% 50%); /* Ellipse */
}
```

### Content Customization

Update text content and styling:

```jsx
<h2 className="font-general text-sm uppercase md:text-[10px]">
  Your Custom Heading
</h2>

<AnimatedTitle
  title="Your <b>Custom</b> Title"
  containerClass={"mt-5 !text-black text-center"}
/>

<div className="about-subtext">
  <p>Your custom description</p>
  <p>Additional details</p>
</div>
```

### Image Replacement

Simply replace the image source:

```jsx
<img
  src="img/your-image.webp"
  alt="Your Description"
  className="absolute left-0 top-0 size-full object-cover"
/>
```

## Performance Tips

1. **Image Optimization**: Use WebP format for better performance
2. **Object-fit**: `object-cover` ensures proper image scaling
3. **Pin Spacing**: `pinSpacing: true` prevents layout jumps
4. **Scrub Values**: Lower values (0.1-0.5) provide smoother animations

## Accessibility Considerations

1. **Alt Text**: Always provide meaningful alt text for images
2. **Reduced Motion**: Consider adding `prefers-reduced-motion` media queries
3. **Focus Management**: Ensure keyboard navigation works during animations
4. **Semantic HTML**: Use proper heading hierarchy

## Browser Support

- **GSAP**: Excellent cross-browser support
- **Clip-path**: Modern browsers (IE11+ with prefixes)
- **CSS Custom Properties**: All modern browsers
- **ScrollTrigger**: All browsers supporting GSAP

## Responsive Design

The component is built with responsive design in mind:

- **Viewport units**: `100vw`, `100vh` work across all screen sizes
- **Tailwind classes**: Responsive breakpoints (`md:text-[10px]`)
- **Flexible layout**: Flexbox ensures proper alignment on all devices

## Usage Tips

1. **Section ID**: The `id="about"` allows for anchor navigation
2. **Z-index Management**: Ensure proper layering with other fixed elements
3. **Image Loading**: Consider lazy loading for performance
4. **Animation Testing**: Test on various devices and scroll speeds
5. **Fallbacks**: Consider fallback styles for browsers without GSAP support
