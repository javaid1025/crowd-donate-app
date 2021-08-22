import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, ToastController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-donor-chat',
    templateUrl: './donor-chat.page.html',
    styleUrls: ['./donor-chat.page.scss'],
})
export class DonorChatPage implements OnInit {

    messages = [];
    user: any;
    newMsg: '';
    loading: any;
    @ViewChild(IonContent) content: IonContent;

    constructor(private readonly loadingCtrl: LoadingController,
                private service: UserService,
                private readonly toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.user = this.service.getUser();
        this.loadMessages();
    }

    loadMessages() {
        const ref = 'admin-' + this.user?.email.split('.').join('');
        firebase.database().ref(`/chat/${ref}/messages`).orderByChild('time').on('value', snapshot => {
            this.messages = [];
            snapshot.forEach((node) => {
                this.messages.push(node.val());
                console.log(this.messages);
            });
        }, err => {
            alert(err);
        });
    }

    async sendMessage() {
        const ref = 'admin-' + this.user?.email.split('.').join('');
        const key = firebase.database().ref().push().key;
        if (!this.messages.length) {
            firebase.database().ref(`/chat/${ref}`).set({
                sender: this.user.email,
            }).then(res => {
            }).catch(err => console.log(err));
        }
        firebase.database().ref(`/chat/${ref}/messages`).child(key).set({
            sender: 'donor',
            name: this.user.fullName,
            time: Date.now(),
            message: this.newMsg
        }).then(res => {
        }).catch(err => console.log(err));
        this.newMsg = '';
        setTimeout(() => {
            this.content.scrollToBottom(10);
        });
    }

}
