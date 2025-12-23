import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export default function favicon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: "#08a4b8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        P
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
