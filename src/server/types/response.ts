export interface GenericResponse {
  message: string;
}

export interface HTMLResponse extends GenericResponse {
  html: string | null;
}
