import "./styles.css";

const PageLoader = () => (
  <main className="page-loader" role="status" aria-label="読み込み中">
    <span className="page-loader-spinner" aria-hidden="true" />
  </main>
);

export default PageLoader;
