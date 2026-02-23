// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function Loader() {
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     // Initial loader animation
//     gsap.fromTo(
//       loaderRef.current,
//       { opacity: 1 },
//       { opacity: 1, duration: 0.5 }
//     );
//   }, []);

//   return (
//     <div
//       ref={loaderRef}
//       id="app-loader"
//       className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
//     >
//       <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Loader = () => {
//   const bubblesRef = useRef([]);

//   useEffect(() => {
//     gsap.fromTo(
//       bubblesRef.current,
//       { scale: 0.3, opacity: 0.3 },
//       {
//         scale: 1,
//         opacity: 1,
//         duration: 0.6,
//         stagger: {
//           each: 0.1,
//           grid: "auto",
//           from: "center",
//         },
//         repeat: -1,
//         yoyo: true,
//         ease: "power2.inOut",
//       }
//     );
//   }, []);

//   return (
//     <div
//       id="app-loader"
//       className="fixed inset-0 flex items-center justify-center bg-white z-50"
//     >
//       <div className="grid grid-cols-3 gap-4 w-32 h-32">
//         {[...Array(9)].map((_, i) => (
//           <div
//             key={i}
//             ref={(el) => (bubblesRef.current[i] = el)}
//             className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-400 to-orange-500 shadow-lg"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Loader;
import loader from "../../../assets/Loader1.gif";

const Loader = () => {
  return (
    <div
      id="app-loader"
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <img src={loader} alt="Loading..." className="w-36 h-36 object-contain" />
    </div>
  );
};

export default Loader;
