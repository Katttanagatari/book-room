import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Btn from "../../shared/ui/Btn";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">Страница не найдена</h2>
      <p className="not-found__description">
        Запрашиваемая страница не существует, была удалена или перенесена на
        другой адрес.
      </p>

      <Btn
        variant="contained"
        onClick={() => navigate("/rooms")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 20px",
        }}
      >
        <HomeOutlinedIcon sx={{ fontSize: 20 }} />
        Вернуться к переговорным
      </Btn>
    </main>
  );
}

export default NotFoundPage;
