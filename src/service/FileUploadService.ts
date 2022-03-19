import { ref, uploadString  } from "firebase/storage";
import { storage  } from "../main";
class FileUploadService {

    uploaddataUrl = async(localPath: string, serverPath: string) => {
        const imageRef = ref(storage, serverPath);
        await uploadString(imageRef, localPath, 'data_url');
        return imageRef.fullPath;
    }
}

export default new FileUploadService();