import "./styles.css";

const TagCloud = () => {
  return (
    <div className="tagcloud-wrapper">
      <div
        className="tagcloud-controls"
        style={{ "--num-elements": "20" } as React.CSSProperties}
      >
        <div
          className="tagcloud-control-button"
          style={{ "--index": "1" } as React.CSSProperties}
        >
          <input type="radio" name="tagcloud-control-input" />
        </div>
        <div
          className="tagcloud-control-button"
          style={{ "--index": "2" } as React.CSSProperties}
        >
          <input type="radio" name="tagcloud-control-input" />
        </div>
        <div
          className="tagcloud-control-button"
          style={{ "--index": "3" } as React.CSSProperties}
        >
          <input type="radio" name="tagcloud-control-input" />
        </div>
        <div className="tagcloud-rotation">
          <ul
            className="tagcloud-tags"
            style={{ "--num-elements": "93" } as React.CSSProperties}
          >
            <li
              className="tagcloud-tag"
              style={{ "--index": "1" } as React.CSSProperties}
            >
              <div>
                <a href="https://www.cssscript.com/" target="_blank">
                  CSSScript
                </a>
              </div>
            </li>
            <li
              className="tagcloud-tag"
              style={{ "--index": "2" } as React.CSSProperties}
            >
              <div>
                <a href="https://www.jqueryscript.net" target="_blank">
                  jQueryScript
                </a>
              </div>
            </li>
            <li
              className="tagcloud-tag"
              style={{ "--index": "3" } as React.CSSProperties}
            >
              <div>
                <a href="https://www.reactscript.com" target="_blank">
                  ReactScript
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TagCloud;
