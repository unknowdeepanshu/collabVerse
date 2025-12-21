import './Model.css';
import { LoaderOne } from "@/components/ui/loader";

export default function Loaderpop  ({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
        <LoaderOne />
    </div>
  );
};

