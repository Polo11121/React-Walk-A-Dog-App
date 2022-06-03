import { CircularProgress } from "@mui/material";

export const WithLoader = ({
  children,
  isLoading,
}: {
  children: JSX.Element;
  isLoading: boolean;
}) =>
  isLoading ? (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="success" />
    </div>
  ) : (
    children
  );
