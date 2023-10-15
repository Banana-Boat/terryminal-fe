import styles from "./index.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  contentBgColor?: string;
}

function RegisterPage({
  title,
  children,
  contentBgColor,
  ...restProps
}: IProps) {
  return (
    <div {...restProps} className={styles.window}>
      <div className={styles.titleBar}>
        <div className={styles.btnGroup}>
          <div className={styles.close} />
          <div className={styles.min} />
          <div className={styles.zoom} />
        </div>
        <span className={styles.title}>{title}</span>
        <div />
      </div>
      <div
        style={{
          backgroundColor: contentBgColor ?? "",
        }}
        className={styles.content}
      >
        {children}
      </div>
    </div>
  );
}

export default RegisterPage;
