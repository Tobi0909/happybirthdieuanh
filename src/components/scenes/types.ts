import type { ComponentType } from "react";

export interface SceneProps {
  /** Called by the scene if it wants to end early (e.g. cake blown). */
  onFinish?: () => void;
  /** True while this scene is the active one. */
  active: boolean;
}

export interface SceneDef {
  id: string;
  /** Auto-advance duration in ms. Set to null to disable auto-advance. */
  durationMs: number | null;
  /** Background gradient (CSS) for the global animated background. */
  background: string;
  Component: ComponentType<SceneProps>;
}