import spacy
import pytextrank
from tqdm import tqdm


class DataPrep:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.nlp.add_pipe("textrank")

    # runs spacy data pipeline
    '''
    need author unique id, hashtable for id to word username
key words of the first tweet in thread
    '''

    def prep_json_data(self, thread_tuples, cur_user):
        final_data = {}

        intros = [[text[0].split("\n**********\n")[0], ind]
                  for ind, text in enumerate(thread_tuples)]

        for doc, i in tqdm(self.nlp.pipe(intros, as_tuples=True)):
            t_full_text, t_ids = thread_tuples[i]
            final_data[t_ids[0]] = {
                "text": t_full_text,
                "keywords": [phrase.text for phrase in doc._.phrases[:5]]
            }
        return final_data
