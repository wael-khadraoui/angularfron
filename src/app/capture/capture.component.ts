import {Component, ElementRef, ViewChild} from '@angular/core';
import {FaceService} from "../services/face.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent {
  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  username: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.play();
    }).catch((err) => {
      console.error('Erreur d’accès à la caméra :', err);
    });
  }

  captureImage() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL('image/jpeg');

    this.sendToApi(imageBase64);
  }

  sendToApi(image: string) {
    this.http.post('http://localhost:5000/capture', {
      username: this.username,
      image: image
    }).subscribe({
      next: (res: any) => this.message = res.message,
      error: (err) => this.message = err.error?.error || 'Erreur lors de l’envoi'
    });
  }
}
