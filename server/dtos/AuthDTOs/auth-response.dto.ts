import { UserDTO } from "@/server/dtos/UserDTOs/user.dto";

export type AuthResponseDTO = {
  user: UserDTO;
  token: string;
};