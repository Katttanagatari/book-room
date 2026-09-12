import { AccessTimeOutlined, PeopleAltOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import Btn from "../../../../shared/ui/Btn";
import "./RoomCard.css";

interface RoomCardProps {
  name?: string;
  floor?: number;
  capacity?: number;
  busyUntil?: string;
  available?: boolean;
  isLoading?: boolean;
  onDetails?: () => void;
  onBook?: () => void;
}

const RoomCard = ({
  name,
  floor,
  capacity,
  busyUntil,
  available,
  isLoading = false,
  onDetails,
  onBook,
}: RoomCardProps) => {
  if (isLoading) {
    return (
      <Card
        sx={{
          width: "100%",
          border: "1px solid #E1E5ED",
          borderRadius: "16px",
          boxShadow: "none",
        }}
      >
        <CardContent
          sx={{
            p: "14px",
            "&:last-child": {
              pb: "14px",
            },
          }}
        >
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="30%" height={18} />

          <Box
            sx={{
              mt: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Skeleton variant="text" width="75%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>

          <Skeleton
            variant="rounded"
            width="100%"
            height={28}
            sx={{ mt: "14px", borderRadius: "7px" }}
          />

          <Box
            className="room-card__actions"
            sx={{
              mt: "12px",
            }}
          >
            <Skeleton variant="rounded" width="100%" height={36} />
            <Skeleton variant="rounded" width="100%" height={36} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid #E1E5ED",
        borderRadius: "16px",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          p: "14px",
          "&:last-child": {
            pb: "14px",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: "#171B2D",
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            mt: "3px",
            fontSize: 12,
            color: "#5B6478",
          }}
        >
          {floor} этаж
        </Typography>

        <Box
          sx={{
            mt: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Box className="room-card__info">
            <PeopleAltOutlined
              sx={{
                fontSize: 17,
                color: "#5B6478",
              }}
            />

            <Typography
              sx={{
                fontSize: 12,
                color: "#5B6478",
              }}
            >
              Вместимость: до {capacity} человек
            </Typography>
          </Box>

          <Box className="room-card__info">
            <AccessTimeOutlined
              sx={{
                fontSize: 17,
                color: "#5B6478",
              }}
            />

            <Typography sx={{ fontSize: 12, color: "#5B6478" }}>
              {available
                ? "Свободна на выбранное время"
                : "Занята на выбранное время"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: "14px",
            height: 28,
            px: "10px",
            display: "flex",
            alignItems: "center",
            borderRadius: "7px",
            backgroundColor: available ? "#D9F7EF" : "#E3E7EF",
            color: available ? "#42877D" : "#596378",
            fontSize: 12,
          }}
        >
          <Box component="span" className="room-card__status-dot" />

          {available
            ? "Доступно на выбранное время"
            : "Недоступно на выбранное время"}
        </Box>

        <Box
          className="room-card__actions"
          sx={{
            mt: "12px",
          }}
        >
          <Btn variant="text" onClick={onDetails} sx={{ width: "100%" }}>
            Подробнее
          </Btn>

          <Btn
            variant="contained"
            disabled={!available}
            onClick={onBook}
            sx={{ width: "100%" }}
          >
            Забронировать
          </Btn>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
