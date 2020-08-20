package com.google.sps.model;

/** An item on a todo list. */
public final class Comment {

  private final long id;
  private final String text;
  private final long timestamp;

  public Comment(long id, String text, long timestamp) {
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
  }
}