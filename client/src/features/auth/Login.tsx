import { Navigate } from "react-router";

import CoverPhoto from "@components/ui/CoverPhoto/CoverPhoto";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";

import coverImage from "@assets/images/26.webp";

import LoginForm from "./LoginForm";
import { LOCKED_DOOR_ART, LOCKED_DOOR_FADE } from "./lockedDoorArt";

import { coverPhotoSx } from "./Login.style";

const Login = () => {
  const { data: session } = authClient.useSession();

  if (session) {
    return <Navigate to={Routes.dashboard} replace />;
  }

  // Rendered while the session is still loading too, so the cover is in the
  // server's HTML; a signed-in visitor is sent on once it arrives
  return (
    <MoonCover
      art={LOCKED_DOOR_ART}
      // 入門 — "entering the gate": becoming a student of a dojo
      kanji="入門"
      eyebrow={<FormattedMessage id="auth.login.hero.eyebrow" />}
      title={<FormattedMessage id="auth.login.title" />}
      compactTitle
      tagline={<FormattedMessage id="auth.login.tagline" />}
      wideArtFade={LOCKED_DOOR_FADE}
      onArt={<LoginForm />}
      onArtBelowMenu
      aboveTitle={<CoverPhoto src={coverImage} sx={coverPhotoSx} />}
    />
  );
};

export default Login;
