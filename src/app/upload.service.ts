import {Injectable}from '@angular/core';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class UploadService {
progress$: any;
progress: any;
progressObserver: any;
constructor() {
    this.progress$ = Observable.create(observer => {
        this.progressObserver = observer
    }).share();
    console.log(localStorage.getItem('reg_no'));
    
}

 makeFileRequest(url: string,  receipt: string, date: string, id: string, files: File[]): Observable<any> {
    return Observable.create(observer => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
            var length :any = files.length
        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
             formData.append("receipt", receipt);
            formData.append("date", date);
             formData.append("id", id);
            formData.append("length", length);
            
        }

        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //             observer.next(JSON.parse(xhr.response));
        //             observer.complete();
        //         } else {
        //             observer.error(xhr.response);
        //         }
        //     }
        // };
        
        
        
        // xhr.upload.onprogress = (event) => {
        //     this.progress = Math.round(event.loaded / event.total * 100);

        //     this.progressObserver.next(this.progress);
        // };

        xhr.open('POST', url, true);
         
        var serverFileName = xhr.send(formData);
        return serverFileName;
    });
}
}