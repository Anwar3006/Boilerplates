# Reusable Navbar Component Guide

A comprehensive guide to implementing an animated, scroll-responsive navbar component with audio controls.

## Dependencies

Install the following dependencies in your React project:

```bash
npm install react react-icons react-use gsap
```

### Package Details:

- **react**: Core React library
- **react-icons**: Icon library (specifically using `TiLocationArrow` from Tabler Icons)
- **react-use**: Utility hooks library (using `useWindowScroll` hook)
- **gsap**: GreenSock Animation Platform for smooth animations

## Required Files

Ensure you have these files in your project:

1. **Button Component**: `./Button` - A reusable button component
2. **Logo Image**: `img/logo.png` - Your logo file
3. **Audio File**: `audio/loop.mp3` - Background audio loop
4. **CSS Styles**: Custom styles (see Styles section below)

## Styles

Add these custom CSS classes to your stylesheet:

```css
@theme {
  --font-general: "general", sans-serif;
}

.floating-nav {
  @apply bg-black rounded-xl border;
}

.nav-hover-btn {
  @apply relative ms-10 font-general text-xs uppercase text-blue-50 cursor-pointer;
}

.indicator-line {
  @apply h-1 w-px rounded-full bg-white transition-all duration-200 ease-in-out;
}

.indicator-line.active {
  animation: indicator-line 0.5s ease infinite;
  animation-delay: calc(var(--animation-order) * 0.1s);
}

@keyframes indicator-line {
  0%,
  100% {
    height: 4px;
    transform: translateY(-0px);
  }
  50% {
    height: 16px;
    transform: translateY(-4px);
  }
}
```

## Component Code

```jsx
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, seIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const navbarContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const toggleAudioIndicator = () => {
    seIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navbarContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navbarContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navbarContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navbarContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navbarContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-7">
            <img src="img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right Side - Navlinks */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  key={index}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
              onClick={toggleAudioIndicator}
            >
              <audio
                src="audio/loop.mp3"
                ref={audioElementRef}
                className="hidden"
                loop
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  key={bar}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
```

## Animation Guide

### useRef Hook Usage

The component uses two `useRef` hooks for different purposes:

1. **navbarContainerRef**:

   - **Purpose**: Creates a direct reference to the navbar DOM element
   - **Why**: Allows GSAP to directly manipulate the DOM element for smooth animations
   - **Usage**: Used for both CSS class manipulation and GSAP animations

2. **audioElementRef**:
   - **Purpose**: References the HTML audio element
   - **Why**: Enables programmatic control of audio playback (play/pause)
   - **Usage**: Called when toggling audio state

### GSAP Animation Implementation

The component uses GSAP (GreenSock Animation Platform) for smooth navbar animations:

```jsx
useEffect(() => {
  gsap.to(navbarContainerRef.current, {
    y: isNavVisible ? 0 : -100,
    opacity: isNavVisible ? 1 : 0,
    duration: 0.2,
  });
}, [isNavVisible]);
```

**How it works:**

- **gsap.to()**: Animates the navbar element to specified properties
- **y: isNavVisible ? 0 : -100**: Moves navbar up/down (-100px when hidden, 0px when visible)
- **opacity**: Fades navbar in/out (1 = visible, 0 = hidden)
- **duration: 0.2**: Animation takes 0.2 seconds
- **Trigger**: Animation runs whenever `isNavVisible` state changes

### Scroll Detection Logic

The navbar responds to user scroll behavior:

1. **At top (scrollY === 0)**: Navbar is visible with normal styling
2. **Scrolling down**: Navbar hides and gets floating style
3. **Scrolling up**: Navbar shows with floating style

This creates an intuitive UX where the navbar appears when users want to navigate.

## Customization Options

### Navigation Items

Modify the `navItems` array to change navigation links:

```jsx
const navItems = ["Home", "Services", "Portfolio", "Contact"];
```

### Animation Duration

Adjust GSAP animation speed:

```jsx
duration: 0.5, // Slower animation
```

### Scroll Sensitivity

The component detects any scroll change. For less sensitive detection, add a threshold:

```jsx
if (Math.abs(currentScrollY - lastScrollY) > 10) {
  // Only trigger on significant scroll changes
}
```

### Audio Controls

Replace the audio file or remove audio functionality entirely by removing the audio-related state and elements.

## Responsive Design

The component includes responsive breakpoints:

- **Mobile**: Logo only, hidden navigation items
- **Desktop (md+)**: Full navigation with all items visible
- Uses Tailwind's responsive classes (`md:flex hidden`, `sm:inset-x-6`)

## Usage Tips

1. **Z-index**: The navbar uses `z-50` to stay above other content
2. **Position**: Fixed positioning keeps it visible during scroll
3. **Accessibility**: Ensure your Button component has proper accessibility attributes
4. **Performance**: GSAP animations are hardware-accelerated for smooth performance
5. **Browser Support**: Modern browsers support all features used
