/**
 * Controls the beavior of the @MarkerComponent component.
 */
export interface MarkerViewModel {
  /**
   * The type, which is a FontAwesome icon name (with or without the 'fa-' prefix.
   */
  type?: string;
  /**
   * The level, which is one the given names.
   */
  level?: 'ERROR' | 'WARNING' | 'NOTICE' | 'INFO';
}