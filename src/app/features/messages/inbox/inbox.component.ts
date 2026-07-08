import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer?: ElementRef;

  conversations: Conversation[] = [];
  messages: Message[] = [];

  currentUser: any;
  currentUserId: string = '';

  selectedConversation?: Conversation;

  newMessage = '';
  private shouldScroll = false;

  constructor(
    private messageService: MessageService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.currentUserId = this.currentUser?._id || this.currentUser?.id || '';
    this.loadConversations();
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  loadConversations() {
    this.messageService.getConversations().subscribe({
      next: (data) => {
        this.conversations = data;
      },
      error: (err) => {
        console.error('[Inbox] Failed to load conversations:', err);
      },
    });
  }

  openConversation(conversation: Conversation) {
    this.selectedConversation = conversation;

    this.messageService.getMessages(conversation._id).subscribe({
      next: (messages) => {
        console.log('MESSAGES', messages);

        this.messages = messages;
        this.shouldScroll = true;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  send() {
    if (!this.selectedConversation || !this.newMessage.trim()) {
      return;
    }

    this.messageService
      .sendMessage(this.selectedConversation._id, this.newMessage)
      .subscribe({
        next: () => {
          this.newMessage = '';

          this.loadConversations();

          this.openConversation(this.selectedConversation!);

          this.shouldScroll = true;
        },
        error: (err) => {
          console.error('[Inbox] Failed to send message:', err);
        },
      });
  }

  isCurrentUserSender(senderId: any): boolean {
    return String(senderId) === String(this.currentUserId);
  }

  private scrollToBottom() {
    if (this.chatContainer) {
      try {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Scroll to bottom failed:', err);
      }
    }
  }

  isCustomerObject(customer: any): boolean {
    return customer && typeof customer === 'object';
  }

  getConversationName(conversation: any): string {
    if (this.isCustomerObject(conversation.customer)) {
      return `${conversation.customer.firstName} ${conversation.customer.lastName}`;
    }

    return conversation.store?.storeName || 'Store';
  }

  getConversationEmail(conversation: any): string {
    if (this.isCustomerObject(conversation.customer)) {
      return conversation.customer.email;
    }

    return 'Store Chat';
  }
}
