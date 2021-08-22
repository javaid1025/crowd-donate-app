import { Injectable } from '@angular/core';
import {Project} from '../models/donations';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];
  length: any;
  uid: any;

  constructor() {
  }

  setProjects(projects) {
    this.projects = projects;
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  getProjects() {
    return this.projects;
  }

  getLength() {
    return this.length;
  }

  getUid() {
    return this.uid;
  }

  setUid(uid) {
    this.uid = uid;
  }

  setLength(length) {
    this.length = length;
  }
}
