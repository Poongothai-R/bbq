import ReactDOM from "react-dom";

export default function Modal({ modalState }) {
    const [modal, setModal] = modalState;

    // Safeguard
    if (modal === null) return null;

    return ReactDOM.createPortal(
        <div className="modal" role="dialog">
            <div className="background" onClick={() => setModal(null)}>
            </div>
            <div className="content">{modal}</div>
        </div>,
        document.getElementById("portal")
    );
}
