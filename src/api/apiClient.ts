// AUTO-GENERATED FILE. DO NOT EDIT.
import {
  AllcodeClient,
  MuseumClient,
} from "./api-client";

import { apiAxios } from "./AxiosTrack";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const _AllcodeService =
  new AllcodeClient(API_BASE_URL, apiAxios);

export const _MuseumService =
  new MuseumClient(API_BASE_URL, apiAxios);
