import { Button, type ButtonProps } from "@mui/material";

type BtnProps = Omit<ButtonProps, "variant"> & {
  variant?: ButtonProps["variant"] | "cancel";
};

function Btn({ variant = "text", ...props }: BtnProps) {
  const isCancel = variant === "cancel";

  return (
    <Button
      {...props}
      variant={isCancel ? "outlined" : variant}
      sx={{
        borderRadius: "8px",
        fontSize: 12,
        textTransform: "none",
        boxShadow: "none",
        fontWeight: "600",
        padding: "10px 16px",

        "&.MuiButton-text": {
          color: "var(--color-primary)",
          backgroundColor: "transparent",
        },

        "&.MuiButton-contained": {
          color: "#fff",
          backgroundColor: "var(--color-primary)",

          "&:hover": {
            backgroundColor: "#4B8F87",
            boxShadow: "none",
          },
        },

        ...(isCancel && {
          color: "#DC2626",
          borderColor: "#FCA5A5",
          backgroundColor: "#fff",

          "&:hover": {
            color: "#B91C1C",
            borderColor: "#EF4444",
            backgroundColor: "#FEF2F2",
            boxShadow: "none",
          },
        }),

        "&.Mui-disabled": {
          color: "#C5CBD8",
          backgroundColor: "#EEF0F5",
        },

        ...props.sx,
      }}
    />
  );
}

export default Btn;
