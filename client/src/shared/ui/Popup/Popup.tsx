import { type ReactNode } from "react";
import { Dialog, DialogContent } from "@mui/material";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Popup({ open, onClose, children }: PopupProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "480px",
            maxWidth: "90vw",
            height: "auto",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      <DialogContent sx={{ p: "24px" }}>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
