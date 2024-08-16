import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";
import styles from "./container1.module.css";

export type Container1Type = {
  className?: string;
};

const Container1: NextPage<Container1Type> = ({ className = "" }) => {
  const onActionsClick = useCallback(() => {
    window.open("https://aipgf.com/telegram");
  }, []);

  return (
    <div className={[styles.container, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.avatarGroupWrapper}>
          <div className={styles.avatarGroup}>
            <img className={styles.avatarIcon} alt="" src="/avatar@2x.png" />
            <img className={styles.avatarIcon1} alt="" src="/avatar-1@2x.png" />
            <img className={styles.avatarIcon2} alt="" src="/avatar-2@2x.png" />
          </div>
        </div>
        <div className={styles.headingParent}>
          <h1 className={styles.heading}>Still have questions?</h1>
          <h3 className={styles.supportingText}>
            Can’t find the answer you’re looking for? Join our Telegram Chat
          </h3>
        </div>
        <div className={styles.actionsWrapper}>
          <Button
            className={styles.actions}
            startIcon={
              <img width="20px" height="20px" src="/telegramlogo.svg" />
            }
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "16",
              background: "#0969da",
              border: "#fff solid 1px",
              borderRadius: "39px",
              "&:hover": { background: "#0969da" },
              width: 135,
            }}
            onClick={onActionsClick}
          >
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Container1;
