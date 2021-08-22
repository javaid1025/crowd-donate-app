import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.page.html',
    styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
    contactUsForm: any;

    constructor(private formBuilder: FormBuilder,
                private emailComposer: EmailComposer) {
    }

    ngOnInit() {
        this.formInitializer();
        this.contactUsForm.controls.email.setValue('');
    }

    formInitializer() {
        this.contactUsForm = this.formBuilder.group({
            email: [null, [Validators.required]],
            subject: [null, [Validators.required]],
            message: [null, [Validators.required]]
        });
    }

    sendMail() {
        const data = this.contactUsForm.value;
        let email: any = {
            to: 'hmuzammal015@gmail.com',
            subject: data.subject,
            body: data.message,
        };
        this.emailComposer.open(email);
    }
}
