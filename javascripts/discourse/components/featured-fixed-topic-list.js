import Component from "@ember/component";
import discourseComputed, { observes } from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import { and } from "@ember/object/computed";

export default Component.extend({
  router: service(),
  tagName: "",

  get topicOneId() {
    return settings.feed_one_topic_id
  },

  get topicTwoId() {
    return settings.feed_two_topic_id
  },

  get topicThreeId() {
    return settings.feed_three_topic_id
  },

  @discourseComputed("router.currentRouteName")
  shouldShow(currentRouteName) {
    return currentRouteName === `discovery.${defaultHomepage()}`;
  },

  showTopicLists: and("shouldShow", "topicOneId", "topicTwoId", "topicThreeId")
});
