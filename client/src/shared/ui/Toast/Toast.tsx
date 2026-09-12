import { Snackbar, Box, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  type?: "success";
  title?: string;
  subtitle?: string;
  autoHideDuration?: number;
}

function Toast({
  open,
  onClose,
  type = "success",
  title = "Бронирование создано",
  subtitle = "Комната Эверест, 24 октября, 15:00–16:00 MSK",
  autoHideDuration = 4000,
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        top: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          width: "700px",
          minHeight: "64px",
          p: "14px 18px",
          backgroundColor: "#ffffff",
          border: "1.5px solid #10b981",
          borderRadius: "14px",
        }}
      >
        <Box
          sx={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#d1fae5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon
            sx={{
              fontSize: "20px",
              color: "#059669",
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#171b2d",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              color: "#64748b",
              mt: "4px",
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            p: 0,
            color: "#94a3b8",
            "&:hover": {
              color: "#64748b",
            },
          }}
        >
          <CancelOutlinedIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
    </Snackbar>
  );
}

export default Toast;
