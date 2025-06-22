# BentoTilt Component Guide

A comprehensive guide to implementing a 3D tilt hover effect component for creating interactive card layouts.

## Dependencies

Install the following dependencies in your React project:

```bash
npm install react react-icons
```

### Package Details:

- **react**: Core React library
- **react-icons**: Icon library (using `TiLocationArrow` from Tabler Icons)

## Required Files

Ensure you have these files in your project:

1. **Video Files**: Various `.mp4` files for the BentoCard backgrounds
2. **CSS Styles**: Custom styles (see Styles section below)

## Styles

Add these custom CSS classes to your stylesheet:

```css
.bento-title {
  @apply uppercase md:text-6xl text-4xl font-black;
  font-family: "Zentry";
}

.special-font b {
  font-family: "Zentry";
  font-feature-settings: "ss01" on;
}

.border-hsla {
  @apply border border-white/20;
}

.bento-tilt_1 {
  @apply relative border-white/20 border col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out;
}

.bento-tilt_2 {
  @apply relative border-white/20 border col-span-1 row-span-1 overflow-hidden rounded-md transition-transform duration-300 ease-out;
}
```

## Component Code

### BentoTilt Component

```jsx
import { useRef, useState } from "react";

const BentoTilt = ({ children, className }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height; // Fixed: was e.clientX

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={`cursor-pointer transition-transform duration-300 ease-out ${className}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;
```

### BentoCard Component

```jsx
const BentoCard = ({ src, title, description, isVideo = true }) => {
  return (
    <div className="relative size-full">
      {isVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={title}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}

      <div className="relative z-10 size-full flex flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
```

## 3D Tilt Animation Guide

### useRef Hook Usage

The `BentoTilt` component uses `useRef` for precise DOM manipulation:

- **itemRef**:
  - **Purpose**: Creates a direct reference to the tilt container element
  - **Why**: Needed to get accurate bounding box dimensions for mouse position calculations
  - **Usage**: `getBoundingClientRect()` provides element's position and size relative to viewport

### Mouse Movement Calculation

The tilt effect calculates mouse position relative to the element:

```jsx
const { left, top, width, height } = itemRef.current.getBoundingClientRect();

const relativeX = (e.clientX - left) / width;
const relativeY = (e.clientY - top) / height;
```

**How it works:**

- **getBoundingClientRect()**: Returns element's position and dimensions
- **relativeX/Y**: Converts absolute mouse coordinates to relative position (0-1)
- **e.clientX/Y**: Mouse coordinates relative to viewport

### 3D Transform Calculation

The tilt angles are calculated based on mouse position:

```jsx
const tiltX = (relativeY - 0.5) * 5;
const tiltY = (relativeX - 0.5) * -5;
```

**Breakdown:**

- **relativeY - 0.5**: Centers the calculation (-0.5 to 0.5 range)
- **Multiply by 5**: Controls tilt intensity (adjust for stronger/weaker effect)
- **tiltY is negative**: Creates natural tilt direction (right mouse = tilt right)

### CSS Transform Application

The 3D effect uses CSS transforms:

```jsx
const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
```

**Transform properties:**

- **perspective(700px)**: Sets 3D viewing distance (lower = more dramatic)
- **rotateX/Y**: Rotates element around X and Y axes
- **scale3d(0.98, 0.98, 0.98)**: Slightly shrinks element for depth effect

### Animation Smoothing

The component includes smooth transitions:

```jsx
const handleMouseLeave = () => {
  setTransformStyle(""); // Reset to original position
};
```

Combined with CSS transitions for smooth return animation:

```css
.cursor-pointer {
  transition: transform 0.3s ease-out;
}
```

## Usage Examples

### Basic Tilt Card

```jsx
<BentoTilt className="w-64 h-48 bg-blue-500 rounded-lg">
  <div className="p-4">
    <h2>Tilt Me!</h2>
  </div>
</BentoTilt>
```

### Video Background Card

```jsx
<BentoTilt className="w-full h-96 rounded-lg overflow-hidden">
  <BentoCard
    src="videos/demo.mp4"
    title="Amazing Feature"
    description="This card tilts on hover with video background"
  />
</BentoTilt>
```

### Custom Content Card

```jsx
<BentoTilt className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg">
  <div className="p-8 text-white">
    <h1 className="text-3xl font-bold">Custom Content</h1>
    <p>Any content can go here</p>
  </div>
</BentoTilt>
```

## Customization Options

### Tilt Intensity

Adjust the multiplier values for different tilt strengths:

```jsx
const tiltX = (relativeY - 0.5) * 10; // Stronger tilt
const tiltY = (relativeX - 0.5) * -2; // Weaker tilt
```

### Perspective Distance

Change the perspective value for different 3D effects:

```jsx
const newTransform = `perspective(400px) ...`; // More dramatic
const newTransform = `perspective(1200px) ...`; // Subtler
```

### Scale Effect

Modify the scale values:

```jsx
scale3d(0.95, 0.95, 0.95); // More shrinking
scale3d(1.02, 1.02, 1.02); // Grow instead of shrink
```

### Transition Duration

Adjust CSS transition timing:

```css
.cursor-pointer {
  transition: transform 0.1s ease-out; /* Faster */
  transition: transform 0.6s ease-out; /* Slower */
}
```

## Performance Considerations

1. **Throttling**: For high-frequency mouse events, consider throttling:

   ```jsx
   const throttledMouseMove = useCallback(
     throttle(handleMouseMove, 16), // ~60fps
     []
   );
   ```

2. **Transform3d**: Uses hardware acceleration for smooth performance

3. **Will-change**: Add CSS property for performance optimization:
   ```css
   .cursor-pointer {
     will-change: transform;
   }
   ```

## Accessibility Notes

- Component maintains keyboard navigation
- Screen readers can access content normally
- Consider adding `prefers-reduced-motion` support:

```css
@media (prefers-reduced-motion: reduce) {
  .cursor-pointer {
    transition: none;
  }
}
```

## Browser Support

- **Modern browsers**: Full support for 3D transforms
- **Mobile**: Works on touch devices (no hover effects)
- **Fallback**: Gracefully degrades without 3D support
