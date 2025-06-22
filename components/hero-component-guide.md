# Reusable Hero Component Guide

A comprehensive guide to implementing an animated hero section with video transitions, loading states, and scroll-triggered animations.

## Dependencies

Install the following dependencies in your React project:

```bash
npm install react react-icons gsap @gsap/react
```

### Package Details:

- **react**: Core React library
- **react-icons**: Icon library (specifically using `TiLocationArrow` from Tabler Icons)
- **gsap**: GreenSock Animation Platform for smooth animations
- **@gsap/react**: Official GSAP React integration (provides `useGSAP` hook)

## Required Files

Ensure you have these files in your project:

1. **Button Component**: `./Button` - A reusable button component
2. **Video Files**:
   - `videos/hero-1.mp4`
   - `videos/hero-2.mp4`
   - `videos/hero-3.mp4`
   - `videos/hero-4.mp4`
3. **CSS Styles**: Custom styles (see Styles section below)

## Styles

Add these custom CSS classes to your stylesheet:

```css
.flex-center {
  @apply flex items-center justify-center;
}

.absolute-center {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}

.special-font b {
  font-family: "Zentry";
  font-feature-settings: "ss01" on;
}

.hero-heading {
  @apply uppercase font-black text-5xl sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem];
  font-family: "Zentry";
}

.mask-clip-path {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

/* Loading Animation */
/* From Uiverse.io by G4b413l */
/* https://uiverse.io/G4b413l/tidy-walrus-92 */
.three-body {
  --uib-size: 35px;
  --uib-speed: 0.8s;
  --uib-color: #5d3fd3;
  position: relative;
  display: inline-block;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
}

.three-body__dot {
  position: absolute;
  height: 100%;
  width: 30%;
}

.three-body__dot:after {
  content: "";
  position: absolute;
  height: 0%;
  width: 100%;
  padding-bottom: 100%;
  background-color: var(--uib-color);
  border-radius: 50%;
}

.three-body__dot:nth-child(1) {
  bottom: 5%;
  left: 0;
  transform: rotate(60deg);
  transform-origin: 50% 85%;
}

.three-body__dot:nth-child(1)::after {
  bottom: 0;
  left: 0;
  animation: wobble1 var(--uib-speed) infinite ease-in-out;
  animation-delay: calc(var(--uib-speed) * -0.3);
}

.three-body__dot:nth-child(2) {
  bottom: 5%;
  right: 0;
  transform: rotate(-60deg);
  transform-origin: 50% 85%;
}

.three-body__dot:nth-child(2)::after {
  bottom: 0;
  left: 0;
  animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15)
    ease-in-out;
}

.three-body__dot:nth-child(3) {
  bottom: -5%;
  left: 0;
  transform: translateX(116.666%);
}

.three-body__dot:nth-child(3)::after {
  top: 0;
  left: 0;
  animation: wobble2 var(--uib-speed) infinite ease-in-out;
}

@keyframes spin78236 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes wobble1 {
  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-66%) scale(0.65);
    opacity: 0.8;
  }
}

@keyframes wobble2 {
  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(66%) scale(0.65);
    opacity: 0.8;
  }
}
```

## Component Code

```jsx
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register ScrollTrigger Plugin to get it to work
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const nextVideoRef = useRef(null);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // GSAP Animation for video transition
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // GSAP Animation for video frame clip-path on scroll
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="h-dvh w-screen overflow-x-hidden relative">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        className="relative z-10 h-dvh w-screen rounded-lg bg-blue-75 overflow-hidden"
        id="video-frame"
      >
        <div>
          <div className="mask-clip-path absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-100">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="max-w-64 mb-5 font-robert-regular text-blue-200">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
```

## Animation Guide

### useRef Hook Usage

The component uses `nextVideoRef` for video control:

- **Purpose**: Creates a direct reference to the next video element
- **Why**: Allows programmatic control of video playback during transitions
- **Usage**: Called in GSAP animation's `onStart` callback to play the video

### useGSAP Hook vs useEffect

This component uses `useGSAP` instead of regular `useEffect` for animations:

**Benefits of useGSAP:**

- **Automatic cleanup**: Handles GSAP timeline cleanup on unmount
- **Revert on update**: `revertOnUpdate: true` automatically reverses animations when dependencies change
- **Better performance**: Optimized for GSAP animations
- **Cleaner code**: No manual cleanup needed

### Video Transition Animation

```jsx
useGSAP(
  () => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });

      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current.play(),
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  },
  { dependencies: [currentIndex], revertOnUpdate: true }
);
```

**How it works:**

1. **gsap.set()**: Immediately makes the next video visible
2. **gsap.to()**: Animates the next video from small preview to full size
3. **gsap.from()**: Animates the current video from scale 0 (creates zoom effect)
4. **onStart callback**: Plays the video when animation begins
5. **revertOnUpdate**: Automatically cleans up when `currentIndex` changes

### Scroll-Triggered Clip Path Animation

```jsx
useGSAP(() => {
  gsap.set("#video-frame", {
    clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
    borderRadius: "0 0 40% 10%",
  });

  gsap.from("#video-frame", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    borderRadius: "0 0 0 0",
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#video-frame",
      start: "center center",
      end: "bottom center",
      scrub: true,
    },
  });
});
```

**How it works:**

1. **gsap.set()**: Sets the final clip-path shape (custom polygon)
2. **gsap.from()**: Animates from rectangular shape to custom shape
3. **ScrollTrigger**: Tied to scroll position for interactive experience
4. **scrub: true**: Animation progress matches scroll progress
5. **Clip-path**: Creates unique geometric shape transformation

### Loading State Management

The component tracks video loading progress:

```jsx
const handleVideoLoad = () => {
  setLoadedVideos((prev) => prev + 1);
};

useEffect(() => {
  if (loadedVideos === totalVideos - 1) {
    setIsLoading(false);
  }
}, [loadedVideos]);
```

**Logic:**

- Each video calls `handleVideoLoad` when loaded
- Loading screen hides when all videos are ready
- Prevents layout shift and ensures smooth experience

## Key Features

### 1. **Interactive Video Preview**

- Small preview video in center that scales on hover
- Click to transition to full-screen video
- Smooth scale and opacity transitions

### 2. **Scroll-Triggered Morphing**

- Video frame changes shape as user scrolls
- From rectangle to custom polygon
- Synchronized with scroll position

### 3. **Loading State**

- Animated loading spinner while videos load
- Prevents interaction until content is ready
- Smooth fade-in when ready

### 4. **Video Cycling**

- Cycles through 4 videos
- Automatic index calculation
- Seamless transitions between videos

## Customization Options

### Change Video Count

```jsx
const totalVideos = 6; // Update to your video count
// Ensure you have videos/hero-1.mp4 through videos/hero-6.mp4
```

### Modify Clip Path Shape

Use [Clippy](https://bennettfeely.com/clippy/) to create custom shapes:

```jsx
clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", // Hexagon
```

### Adjust Animation Timing

```jsx
duration: 1.5, // Slower transitions
ease: "power2.out", // Different easing
```

### Custom Loading Animation

Replace the three-body loader with your own:

```jsx
{
  isLoading && (
    <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600" />
    </div>
  );
}
```

## ScrollTrigger Configuration

**Key ScrollTrigger properties:**

- **trigger**: Element that triggers the animation
- **start**: When animation starts (element position + viewport position)
- **end**: When animation ends
- **scrub**: Links animation progress to scroll progress
- **pin**: Pins element during animation (optional)

## Performance Considerations

1. **Video Optimization**: Use compressed MP4 files for better loading
2. **Preload Strategy**: Component loads videos progressively
3. **GSAP Performance**: Uses hardware acceleration automatically
4. **Memory Management**: useGSAP handles cleanup automatically

## Browser Support

- **Modern browsers**: Full support for all features
- **Video formats**: MP4 recommended for best compatibility
- **GSAP**: Works in all modern browsers
- **Clip-path**: Good support, fallback to border-radius for older browsers

## Usage Tips

1. **Video Quality**: Balance file size with quality for web delivery
2. **Accessibility**: Add proper alt text and video descriptions
3. **Mobile**: Test on mobile devices for performance
4. **Fallbacks**: Consider static images for low-bandwidth users
5. **SEO**: Use proper heading structure and meta tags
