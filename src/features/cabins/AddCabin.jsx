import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

// Compound Component

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation="primary" size="medium">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   function handleClose() {
//     setIsOpenModal((show) => !show);
//   }

//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="medium"
//         onClick={() => setIsOpenModal((show) => !show)}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal handleClose={handleClose}>
//           <CreateCabinForm handleClose={handleClose} />
//         </Modal>
//       )}
//     </div>
//   );
// }
