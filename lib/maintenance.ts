"use client";

import { useState, useEffect } from "react";

export function useMaintenance() {
  // Por defecto, el modo mantenimiento está activo si no se desactiva explícitamente con "false"
  const isMaintenanceConfigured = process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== "false";

  const [isPreviewUnlocked, setIsPreviewUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Revisar si la URL contiene el pase directo: ?preview=danny o ?preview=2026
    const params = new URLSearchParams(window.location.search);
    const previewVal = params.get("preview");
    if (previewVal === "danny" || previewVal === "2026") {
      localStorage.setItem("optica_preview_unlocked", "true");
      setIsPreviewUnlocked(true);
      setChecking(false);
      return;
    }

    // 2. Revisar si ya desbloqueó antes en su navegador
    if (localStorage.getItem("optica_preview_unlocked") === "true") {
      setIsPreviewUnlocked(true);
      setChecking(false);
      return;
    }

    // 3. Revisar si tiene sesión activa de administrador en el servidor
    async function checkAdminSession() {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsPreviewUnlocked(true);
            return;
          }
        }
      } catch (err) {
        console.error("Error al verificar estado de preview:", err);
      } finally {
        setChecking(false);
      }
    }

    checkAdminSession();
  }, []);

  const unlockPreview = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("optica_preview_unlocked", "true");
    }
    setIsPreviewUnlocked(true);
  };

  const lockPreview = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("optica_preview_unlocked");
    }
    setIsPreviewUnlocked(false);
  };

  // El modo construcción está activo para el usuario SI la configuración lo habilita Y el usuario NO ha desbloqueado la preview
  const isBlocked = isMaintenanceConfigured && !isPreviewUnlocked;

  return {
    isMaintenanceConfigured,
    isBlocked,
    isPreviewUnlocked,
    unlockPreview,
    lockPreview,
    checking,
  };
}
