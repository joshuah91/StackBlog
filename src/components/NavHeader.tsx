import Link from "next/link";
import styles from "@/styles/Nav.module.scss";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
const NavHeader = () => {
  const [authAnchorEl, setAuthAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className={styles.nav}>
      <div className={styles.nav_container}>
        <Link href="/">
          <button>StackBuld</button>
        </Link>
        {/*tablet down screen  */}
        <>
          <div
            className={styles.navButton}
            aria-controls={Boolean(authAnchorEl) ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(authAnchorEl) ? "true" : undefined}
            onClick={(e) => setAuthAnchorEl(e.currentTarget)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="#344054"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Menu
            id="auth-menu"
            anchorEl={authAnchorEl}
            open={Boolean(authAnchorEl)}
            onClose={() => setAuthAnchorEl(null)}
            disableScrollLock={true}
            MenuListProps={{
              "aria-labelledby": "auth-icon-button",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: 0,
                  mr: 0,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <MenuItem
              onClick={() => {
                setAuthAnchorEl(null);
              }}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  background: "none",
                },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                color: "#667085",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
            >
              <Link href="/">Home</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAuthAnchorEl(null);
              }}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  background: "none",
                },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                color: "#667085",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
            >
              <Link href="/">Products</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAuthAnchorEl(null);
              }}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  background: "none",
                },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                color: "#667085",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
            >
              <Link href="/">Resources</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAuthAnchorEl(null);
              }}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  background: "none",
                },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                color: "#667085",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
            >
              <Link href="/">Pricing</Link>
            </MenuItem>
            <br />
            <MenuItem
              onClick={() => {
                setAuthAnchorEl(null);
              }}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  background: "none",
                },
              }}
            >
              <button
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  border: "none",
                  background: "#fff",
                  color: "#667085",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  cursor: "pointer",
                }}
              >
                Log in
              </button>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAuthAnchorEl(null);
              }}
              sx={{
                "&.MuiButtonBase-root.MuiMenuItem-root": {
                  background: "none",
                },
              }}
            >
              <button
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color: "#fff",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  borderRadius: "8px",
                  border: "1px solid #7f56d9",
                  background: "#7f56d9",
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
              >
                Sign up
              </button>
            </MenuItem>
          </Menu>
        </>
        {/* --end-- */}
        <div className={styles.nav_container_content}>
          <div className={styles.content}>
            <Link href="/" className={styles.content__item}>
              Home
            </Link>
            <Link href="/" className={styles.content__item}>
              Products
            </Link>
            <Link href="/" className={styles.content__item}>
              Resources
            </Link>
            <Link href="/" className={styles.content__item}>
              Pricing
            </Link>
          </div>
        </div>
        <div className={styles.nav_container_buttons}>
          <button className={styles.log}>Log in</button>
          <button className={styles.reg}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
