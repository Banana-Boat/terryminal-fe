import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import MacWindow from "@/components/mac-window";
interface IProps {}

function NotFoundPage({}: IProps) {
  const descDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const typed = new Typed(descDivRef.current, {
      strings: ["Oops! Page not found! ^200 <br /> Please check the URL..."],
      typeSpeed: 30,
      cursorChar: "_",
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className={styles.container}>
      <MacWindow
        title="User@Terryminal:~/404"
        style={{
          width: "45%",
          height: "60%",
          minWidth: "600px",
          minHeight: "380px",
        }}
      >
        <div>
          <span ref={descDivRef} className={styles.desc} />
        </div>
      </MacWindow>
    </div>
  );
}

export default NotFoundPage;
