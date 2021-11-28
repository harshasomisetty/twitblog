import urlexpander
import re


# TODO make link stripping nicer (remove Twit status, fix exception
def insert_link(link: str):
    website = urlexpander.expand(link)
    if "twitter.com" in website:
        status_num = re.search("status\/[0-9]*", website).group(0)
        return "\n[[" + website + "][" + "Twit Status " + str(
            status_num) + "]]\n"
    #detect if twitter link or not
    # if twitter, specify twitter
    # if not twitter, get name of website
    else:
        try:
            domain = re.search("https:\/\/[a-zA-Z0-9]*\.[a-z]*\/",
                               website).group(0)
        except:
            domain = "ref"
        return "\n[[" + website + "][" + domain + "]]\n"


def expand_tweet_text(text: str, expand=False):

    if expand:
        sentences = [s for s in text.split("\n")]
        text = ""
        for sentence in sentences:
            words = [w for w in sentence.split(" ")]
            for i in range(len(words)):
                # if re.match('https:\/\/t.co\/[a-zA-Z0-9]*', words[i]):
                if "https://t.co/" in words[i]:

                    words[i] = insert_link(words[i])  # can expand links

            text += " ".join(words) + "\n"

    return text
