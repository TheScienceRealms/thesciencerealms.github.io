/* ============ UNITS AND TOPICS ============ */
const UNITS=[
 {id:"u1",hash:"theoretical-frontier",kick:"WJEC PSYCHOLOGY · UNIT 1",name:"The Theoretical Frontier",blurb:"The different psychological approaches, theories and explanations of human behaviour.",paper:"Psychology: Past to Present · 1 h 30 min · 50% of AS",cls:""},
 {id:"u2",hash:"research-frontier",kick:"WJEC PSYCHOLOGY · UNIT 2",name:"The Research Frontier",blurb:"Research methods, experimental design, data collection and analysis.",paper:"Psychology: Using Psychological Concepts · 1 h 30 min · 50% of AS",cls:"u2"}];
const TOPICS=[
 {id:"bio",u:"u1",name:"The biological approach",short:"Biological"},
 {id:"pd",u:"u1",name:"The psychodynamic approach",short:"Psychodynamic"},
 {id:"beh",u:"u1",name:"The behaviourist approach",short:"Behaviourist"},
 {id:"cog",u:"u1",name:"The cognitive approach",short:"Cognitive"},
 {id:"pos",u:"u1",name:"The positive approach",short:"Positive"},
 {id:"ex1",u:"u1",name:"Unit 1 exam skills",short:"Exam skills"},
 {id:"deb",u:"u2",name:"Contemporary debates",short:"Debates"},
 {id:"cls",u:"u2",name:"Milgram and Kohlberg",short:"Classic research"},
 {id:"rq",u:"u2",name:"Aims, hypotheses and variables",short:"Research questions"},
 {id:"meth",u:"u2",name:"Methodologies and data",short:"Methodologies"},
 {id:"loc",u:"u2",name:"Location of research",short:"Location"},
 {id:"samp",u:"u2",name:"Participants and sampling",short:"Sampling"},
 {id:"des",u:"u2",name:"Experimental design",short:"Design"},
 {id:"data",u:"u2",name:"Levels of measurement, graphs and statistics",short:"Data"},
 {id:"rv",u:"u2",name:"Reliability and validity",short:"Reliability & validity"},
 {id:"eth",u:"u2",name:"Ethics",short:"Ethics"},
 {id:"ex2",u:"u2",name:"Novel scenarios and Section B skills",short:"Section B skills"}];
const topicById=id=>TOPICS.find(t=>t.id===id);
const unitById=id=>UNITS.find(u=>u.id===id);
const APS=["bio","pd","beh","cog","pos"];

/* ============ APPROACH ARENA: sort into approaches ============ */
const ARENA=[
 ["Evolutionary influences","bio"],["Localisation of brain function","bio"],["Neurotransmitters","bio"],["Drug therapy","bio"],["Psychosurgery","bio"],["Raine, Buchsbaum and LaCasse (1997)","bio"],["PET scans of glucose metabolism","bio"],["Behaviour shaped by natural selection","bio"],
 ["Influence of childhood experiences","pd"],["The unconscious mind","pd"],["Tripartite personality: id, ego and superego","pd"],["Dream analysis","pd"],["Group analysis psychotherapy","pd"],["Bowlby (1944) Forty-four juvenile thieves","pd"],["Defence mechanisms","pd"],["Manifest and latent content","pd"],
 ["Blank slate (tabula rasa)","beh"],["Behaviour learnt through conditioning","beh"],["Humans and animals learn in similar ways","beh"],["Aversion therapy","beh"],["Systematic desensitisation","beh"],["Watson and Rayner (1920) Little Albert","beh"],["Positive reinforcement","beh"],["Anxiety hierarchy","beh"],
 ["Computer analogy","cog"],["Internal mental processes","cog"],["Schemas","cog"],["Cognitive behavioural therapy (CBT)","cog"],["Rational emotive behaviour therapy (REBT)","cog"],["Loftus and Palmer (1974)","cog"],["Input → processing → output","cog"],["The ABC model","cog"],
 ["Acknowledgement of free will","pos"],["Authenticity of goodness and excellence","pos"],["Focus on ‘the good life’","pos"],["Mindfulness","pos"],["Quality of life therapy","pos"],["Myers and Diener (1995) Who is happy?","pos"],["Eudaimonia (flourishing)","pos"],["The CASIO model","pos"]];

/* ============ RELATIONSHIP FORMATION ============ */
// [approach, assumption, explanation]
const RELS=[
 ["bio","Evolutionary influences","Partners are chosen to maximise reproductive success. Buss (1989) found men across 37 cultures valued youth and physical attractiveness (signs of fertility) and women valued resources and status, so relationships form between people who meet these preferences."],
 ["bio","Neurotransmitters","Hormones and neurotransmitters such as oxytocin (released during touch and intimacy) and dopamine (reward) create feelings of bonding and pleasure, so people are motivated to stay close and form a relationship."],
 ["pd","Influence of childhood experiences","Early attachment to the mother acts as an internal working model (Bowlby). A secure childhood attachment gives a template for trusting, loving adult relationships."],
 ["pd","The unconscious mind","People are unconsciously drawn to partners who resemble a parent, through transference of feelings from childhood relationships onto the new partner."],
 ["beh","Behaviour learnt through conditioning","Through operant conditioning, a partner who provides rewards (praise, company, gifts) is positively reinforcing, so we keep returning to them. Through classical conditioning, a person paired with pleasant experiences becomes associated with good feelings."],
 ["beh","Humans and animals learn in similar ways","Like Harlow’s monkeys or a dog fed by its owner, we form attachments to those associated with reward, such as the ‘cupboard love’ explanation of attachment."],
 ["cog","Schemas","We hold a relationship schema (a mental framework of what a partner and a relationship should be like). We form relationships with people who fit our schema."],
 ["cog","Internal mental processes","We process information about potential partners, weighing up costs and benefits and making judgements, which leads to the decision to form a relationship."],
 ["pos","Focus on ‘the good life’","Positive relationships are part of a meaningful, fulfilling life. People form relationships because connection with others builds positive emotions and well-being."],
 ["pos","Acknowledgement of free will","Relationships are freely chosen. People actively choose partners who help them grow and flourish, rather than being driven by biology or the past."]];
