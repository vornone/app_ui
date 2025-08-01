// import { useEffect, useRef, useCallback } from 'react';

// import { ReactNode } from 'react';

// interface GradientBackgroundProps {
//   children: ReactNode;
//   className?: string;
// }

// const GradientBackground = ({ children, className = '' }: GradientBackgroundProps) => {
//   const interactiveRef = useRef<HTMLDivElement>(null);
//   const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
//   const animationRef = useRef<number | null>(null);

//   const updateInteractive = useCallback(() => {
//     if (!interactiveRef.current) return;

//     const { x: mouseX, y: mouseY } = mouseRef.current;
//     const x = (mouseX / window.innerWidth) * 30 - 15; // Reduced movement range
//     const y = (mouseY / window.innerHeight) * 30 - 15;

//     interactiveRef.current.style.transform = `translate3d(${x}%, ${y}%, 0)`;
//   }, []);

//   const animate = useCallback(() => {
//     updateInteractive();
//     animationRef.current = requestAnimationFrame(animate);
//   }, [updateInteractive]);

//   useEffect(() => {
//     const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
//       mouseRef.current.x = e.clientX;
//       mouseRef.current.y = e.clientY;
//     };

//     document.addEventListener('mousemove', handleMouseMove, { passive: true });
//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [animate]);

//   const gradientStyles: React.CSSProperties = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     overflow: 'hidden',
//     background: 'linear-gradient(135deg, #06165aff 0%, #3e3249ff 100%)',
//     zIndex: -1
//   };

//   const containerStyles: React.CSSProperties = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     filter: 'blur(25px)',
//     willChange: 'transform'
//   };

//   const orbStyles: React.CSSProperties = {
//     position: 'absolute',
//     borderRadius: '50%',
//     willChange: 'transform',
//     backfaceVisibility: 'hidden',
//     mixBlendMode: 'screen'
//   };

//   return (
//     <>
//       <div className={`gradient-background ${className}`} style={gradientStyles}>
//         <div style={containerStyles}>
//           {/* Primary orb */}
//           <div
//             style={{
//               ...orbStyles,
//               width: '40vw',
//               height: '40vw',
//               background: 'radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, transparent 70%)',
//               top: '20%',
//               left: '10%',
//               animation: 'float1 20s ease-in-out infinite'
//             }}
//           />

//           {/* Secondary orb */}
//           <div
//             style={{
//               ...orbStyles,
//               width: '35vw',
//               height: '35vw',
//               background: 'radial-gradient(circle, rgba(78, 205, 196, 0.6) 0%, transparent 70%)',
//               top: '40%',
//               right: '10%',
//               animation: 'float2 25s ease-in-out infinite reverse'
//             }}
//           />

//           {/* Accent orb */}
//           <div
//             style={{
//               ...orbStyles,
//               width: '30vw',
//               height: '30vw',
//               background: 'radial-gradient(circle, rgba(255, 195, 113, 0.5) 0%, transparent 70%)',
//               bottom: '20%',
//               left: '30%',
//               animation: 'float3 18s ease-in-out infinite'
//             }}
//           />

//           {/* Interactive orb */}
//           <div
//             ref={interactiveRef}
//             style={{
//               ...orbStyles,
//               width: '25vw',
//               height: '25vw',
//               background: 'radial-gradient(circle, rgba(199, 125, 255, 0.4) 0%, transparent 70%)',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)'
//             }}
//           />
//         </div>
//       </div>

//       {/* Content overlay */}
//       <div style={{ position: 'relative', zIndex: 1 }}>
//         {children}
//       </div>

//       <style >{`
//         @keyframes float1 {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           25% { transform: translate(20px, -30px) rotate(90deg); }
//           50% { transform: translate(-10px, 20px) rotate(180deg); }
//           75% { transform: translate(-30px, -10px) rotate(270deg); }
//         }

//         @keyframes float2 {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           33% { transform: translate(-25px, 15px) rotate(120deg); }
//           66% { transform: translate(15px, -20px) rotate(240deg); }
//         }

//         @keyframes float3 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(25px, -25px) scale(1.1); }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .gradient-background * {
//             animation: none !important;
//           }
//         }

//         @media (max-width: 768px) {
//           .gradient-background div {
//             filter: blur(20px) !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// // Example usage component
// const BackgroundArtifact = () => {
//   return (
//     <div style={{
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//       zIndex: -1,
//       position: 'fixed',
//     }}>
//       <GradientBackground>
//       </GradientBackground>
//     </div>
//   );
// };

// export default BackgroundArtifact;
