import './Model.css';

export default function Modalpop  ({ isOpen, onClose, children,iscross=true }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {iscross && (<button className="modal-close-button" onClick={onClose}>
          &times;
        </button>)}
        {children}
      </div>
    </div>
  );
};
