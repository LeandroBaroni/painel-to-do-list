import { apiErrosTranslate } from "@resources/api-erros-translate";

export function getApiError(
  errorCode: string,
  defaultMessage = 'Não foi possível concluir sua solicitação, por favor tente novamente.'
): string {
  return apiErrosTranslate[errorCode] ?? defaultMessage;
}
