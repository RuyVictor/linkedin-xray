import { IAllInformations } from "interfaces/all-informations.interface";
import { IGetInfoDTO } from "./dtos/get-info.dto";
export declare class LinkedinXray {
    private profileInfo;
    private prepareUrl;
    getInfo({ profileUrl }: IGetInfoDTO): Promise<IAllInformations>;
}
