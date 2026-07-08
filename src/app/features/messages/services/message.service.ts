import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conversation } from '../models/conversation';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private api = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.api}/conversations`);
  }

  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/${id}`);
  }

  sendMessage(id: string, text: string) {
    return this.http.post(`${this.api}/${id}`, {
      text,
    });
  }

  startConversation(storeId: string) {
    return this.http.post(`${this.api}/start`, {
      storeId,
    });
  }
}
