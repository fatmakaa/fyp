import "dotenv/config";
import prisma from "./src/lib/prisma";

// new types for the list
type EvidenceItem = {
  type: string;
  title: string;
  description: string;
  url?: string;
};

type VerifiedOpinion = {
  question: string;
  ruling: string;
  reasoning: string;
  methodologyNote: string;
  source: string;
  evidence?: EvidenceItem;
};

const topics = [
  { question: "Should “Bismillah” be recited aloud during prayer?", category: "Prayer" },
  { question: "Should “Ameen” be recited aloud after Chapter Al-Fatiha?", category: "Prayer" },
  { question: "At which points in the prayer should the hands be raised (raf‘ al-yadayn)?", category: "Prayer" },
  { question: "Where should the hands be placed during standing in prayer?", category: "Prayer" },
  { question: "Is verbal articulation of intention (niyyah) required for prayer?", category: "Prayer" },
  { question: "Does minor movement invalidate the prayer?", category: "Prayer" },
  { question: "Is it permissible to recite from a written text during prayer?", category: "Prayer" },
  { question: "Is a traveller permitted to delay or break fasting during Ramadan?", category: "Fasting" },
  { question: "Does unintentional eating or drinking invalidate the fast?", category: "Fasting" },
  { question: "Does vomiting invalidate the fast?", category: "Fasting" },
  { question: "Does bleeding invalidate ablution (wudu)?", category: "Purification" },
  { question: "Is wiping over socks permissible during ablution?", category: "Purification" },
  { question: "Should the feet be washed or wiped during ablution?", category: "Purification" },
  { question: "Does laughing during prayer invalidate ablution (wudu)?", category: "Purification" },
  { question: "Is zakat obligatory on personal jewellery such as gold and silver?", category: "Zakat" },
  { question: "Can zakat be distributed directly to individuals without an intermediary?", category: "Zakat" },
  { question: "Is it permissible to perform Tawaf without maintaining ablution (wudu)?", category: "Hajj" },
  { question: "Can a pilgrim delegate certain rituals to another person?", category: "Hajj" },
];

const scholars = [
  {
    name: "Abu Hanifa",
    school: "Hanafi",
    biography:
      "Abu Hanifa (d. 150 AH) was the eponym of the Hanafi school. Renowned for his systematic use of qiyas (analogical reasoning) and istihsan (juristic preference), he developed a structured methodology for deriving rulings that remains one of the most influential approaches in Islamic legal theory.",
  },
  {
    name: "Malik ibn Anas",
    school: "Maliki",
    biography:
      "Malik ibn Anas (d. 179 AH) was the eponym of the Maliki school and author of al-Muwatta. His methodology gives weight to the practice of the people of Madinah alongside the Qur'an and Sunnah, and later Maliki scholars developed reasoning based on public welfare (maslahah) and the objectives of Islamic law (maqasid).",
  },
  {
    name: "Al-Shafi'i",
    school: "Shafi'i",
    biography:
      "Al-Shafi'i (d. 204 AH) was the eponym of the Shafi'i school and a founding figure of usul al-fiqh through his work al-Risala. He systematised legal theory, establishing the Qur'an, Sunnah, consensus (ijma'), and analogy (qiyas) as the recognised sources of law.",
  },
  {
    name: "Ahmad ibn Hanbal",
    school: "Hanbali",
    biography:
      "Ahmad ibn Hanbal (d. 241 AH) was the eponym of the Hanbali school. Known for his emphasis on transmitted texts, he built the school's approach primarily on the Qur'an and hadith, giving a subordinate role to juristic opinion and analogy.",
  },
];

// Verified opinions carried over from the previous version's per-school content.
// Half match the topic question exactly; all other topics keep stub opinions.
const verifiedContent: Record<string, VerifiedOpinion[]> = {
  Hanafi: [
    {
      question: "Should “Bismillah” be recited aloud during prayer?",
      ruling: "The basmalah should be recited silently before al-Fatihah in prayer.",
      reasoning:
        "Al-Hidayah states that the imam pronounces the ta‘awwudh, tasmiyah and amin inaudibly. It cites the report of Ibn Mas‘ud that four utterances are made silently by the imam, including the basmalah. The text also acknowledges the Shafi‘i evidence for audible recitation, but explains that reports of audible recitation are interpreted as cases of instruction rather than the regular practice. Al-Hidayah then cites the report of Anas that the Prophet (peace be upon him) did not normally pronounce the basmalah audibly. Therefore, the Hanafi ruling is that the basmalah is recited, but silently, before al-Fatihah. This reflects a reconciliation of different narrations rather than ignoring the reports of audible recitation.",
      methodologyNote:
        "Hadith reconciliation: audible-recitation reports are treated as instructional exceptions, while silent-recitation reports are treated as the normal practice.",
      source: "Al-Hidayah: The Guidance, Book II: Prayer, Chapter 11: The Description of Prayer",
      evidence: {
        type: "Hadith / Fiqh Evidence",
        title: "Reports of Ibn Mas‘ud and Anas cited in Al-Hidayah",
        description:
          "Al-Hidayah cites Ibn Mas‘ud regarding silent recitation of ta‘awwudh, tasmiyah and amin, and cites Anas regarding the Prophet (peace be upon him) not pronouncing the basmalah audibly. The Hanafi ruling is built by reconciling these reports with reports used by the Shafi‘i school for audible recitation.",
        url: "https://sunnah.com/search?q=Anas+Bismillah+audibly+prayer",
      },
    },
    {
      question: "Does bleeding invalidate ablution (wudu)?",
      ruling:
        "Flowing blood, pus, or similar discharge invalidates wudu when it exits the body and flows beyond the point of emergence.",
      reasoning:
        "Al-Hidayah explains that factors annulling minor ablution include what exits from the two passages, and then extends the ruling to blood and pus when they ooze from the body and move onto a part of the body that is subject to purification. The important condition is flow. If blood or pus appears but does not flow beyond the wound, wudu is not annulled. The text later gives the example of a scab being removed from a wound: if water, pus, or another discharge flows from the mouth of the wound, wudu is annulled; if it does not flow, wudu is not annulled. The Hanafi position therefore does not treat the mere appearance of blood as sufficient. The operative legal factor is the emergence and spread of impurity.",
      methodologyNote:
        "Qiyas/legal causation: flowing impurity from the body is treated analogically with recognised causes of hadath because the effective cause is the outward spread of impurity.",
      source: "Al-Hidayah: The Guidance, Book I: Purification, Section 2: Factors Annulling Minor Ablution",
      evidence: {
        type: "Fiqh Reasoning / Qiyas",
        title: "Flowing impurity as a cause of wudu nullification",
        description:
          "Al-Hidayah extends the discussion of nullifiers of wudu to blood and pus when they ooze from the body and move to an area subject to purification. The reasoning depends on the flow and spread of impurity, not the mere appearance of blood.",
        url: "https://can-ada.net/wp-content/uploads/2024/11/Al-Hidayah-The-Guidance-Vol-1-Vol2.pdf",
      },
    },
    {
      question: "Is wiping over socks permissible during ablution?",
      ruling:
        "Wiping over socks is permissible when the socks are thick and functionally comparable to khuffs; the relied-upon Hanafi fatwa follows this permissive position.",
      reasoning:
        "Al-Hidayah records that Abu Hanifah originally did not permit wiping over ordinary socks unless they were made of leather or were shod. The text then presents the view of Abu Yusuf and Muhammad, who permitted wiping over thick, non-porous socks because such socks can be walked in and remain fixed to the calf without needing to be tied. Their reasoning is that thick socks resemble khuffs in practical function. Al-Hidayah also cites reports that the Prophet (peace be upon him) performed wiping over socks. The text then notes that Abu Hanifah is reported to have retracted his original view in favour of the opinion of his two students, and that the fatwa is based on this later position. Therefore, the final relied-upon Hanafi position allows wiping over thick socks, while thin or fragile socks are not treated the same way.",
      methodologyNote:
        "Hadith + functional analogy: thick socks are treated like khuffs when they fulfil the same practical legal function, and the later relied-upon fatwa follows this view.",
      source: "Al-Hidayah: The Guidance, Book I: Purification, Chapter 5: Mash on Boots",
      evidence: {
        type: "Hadith / Functional Analogy",
        title: "Report of wiping over socks and sandals",
        description:
          "Al-Hidayah cites reports that the Prophet (peace be upon him) wiped over socks, while also applying functional analogy between thick socks and khuffs. The relied-upon Hanafi fatwa follows the permissive view when the socks are thick and functionally comparable to khuffs.",
        url: "https://sunnah.com/tirmidhi:99",
      },
    },
  ],
  Maliki: [
    {
      question: "Should “Bismillah” be recited aloud during prayer?",
      ruling:
        "In the Maliki school, the basmalah is not recited aloud in obligatory prayer; according to the relied-upon position in Al-Risalah, it is not recited before al-Fatihah or the following surah in the obligatory prayer.",
      reasoning:
        "Al-Risalah states that when reciting in Subh and other obligatory prayers, the worshipper does not say 'bismi'llahi-r-rahmani'r-rahim' for al-Fatihah or for the surah after it. The commentary explains that this applies whether the prayer is recited aloud or silently, and whether the person is imam, follower, or praying alone. The text treats the wording as indicating dislike rather than absolute prohibition, and it cites the report of Abdullah ibn Mughaffal that he prayed with the Prophet (peace be upon him), Abu Bakr, Umar and Uthman and did not hear them recite it. Therefore, the Maliki position represented here is that obligatory prayer begins the recitation with al-Fatihah itself, without audible basmalah and, according to this text, without reciting it at all in the obligatory prayer. This makes the Maliki ruling distinct from the Shafi‘i position, where the basmalah is treated as part of al-Fatihah, and also distinct from the Hanafi position, where it is recited silently.",
      methodologyNote:
        "Inherited practice and transmitted precedent: the ruling follows the Maliki treatment of prayer recitation through the practice reported from the Prophet (peace be upon him) and the early caliphs, giving weight to established communal practice rather than treating the basmalah as an audible component of the obligatory recitation.",
      source: "Al-Risalah, Chapter 10: The Form of the Prayer, 10.1f: Basmala",
      evidence: {
        type: "Hadith report cited in source",
        title: "Report of Abdullah ibn Mughaffal",
        description:
          "Al-Risalah cites the report that Abdullah ibn Mughaffal did not hear the Prophet (peace be upon him), Abu Bakr, Umar or Uthman recite the basmalah in prayer, and uses this to support not reciting it in obligatory prayer.",
      },
    },
    {
      question: "Does bleeding invalidate ablution (wudu)?",
      ruling:
        "Bleeding does not invalidate wudu in the Maliki school. Blood may require cleaning if it affects the prayer, but it does not itself break ablution.",
      reasoning:
        "Al-Risalah discusses nosebleeds during prayer and allows the person to deal with the bleeding without treating the ablution as automatically broken. The text explains that if the blood is slight, the person should not leave the prayer, but should staunch the blood with the fingers unless it is pouring or dripping. If heavier bleeding occurs, the discussion focuses on leaving to wash the blood and then building on the prayer under certain conditions, not on renewing wudu because blood itself has invalidated it. This shows that Maliki law distinguishes between impurity that may need to be removed from the body or clothing and ritual impurity that invalidates wudu. Therefore, unlike the Hanafi position, flowing blood is not treated as a general nullifier of wudu in the Maliki school.",
      methodologyNote:
        "Restriction to recognised nullifiers: the Maliki ruling does not extend wudu invalidation to ordinary bleeding by analogy; instead, it treats bleeding primarily as an issue of removing impurity and maintaining the validity of prayer.",
      source: "Al-Risalah, Chapter 12: Various Aspects of the Prayer, 12.11: Nosebleeds",
    },
    {
      question: "Is wiping over socks permissible during ablution?",
      ruling:
        "Wiping is permissible over leather socks or valid leather-like footgear in the Maliki school when the required conditions are met. Ordinary cotton socks are not included in this permission.",
      reasoning:
        "Al-Risalah has a dedicated chapter on wiping over leather socks and states that wiping over them is permitted as a dispensation, though washing the feet is better. The text explains that the permission applies to leather socks and comparable footwear, but the listed preconditions exclude ordinary cotton socks. The footgear must cover the area required to be washed up to the ankles, be pure, suitable for walking, and must have been put on after complete purification with water. The person may wipe over them after later breaking wudu by minor impurity, but not after major impurity, because major impurity requires washing. The text also notes a distinctive Maliki detail: wiping is not limited by a known period in the relied-upon presentation, although another report from Malik mentions one day and night for a resident and three days for a traveller. Therefore, the Maliki answer is conditional: wiping is allowed, but only over valid leather socks or comparable footgear, not ordinary thin socks.",
      methodologyNote:
        "Conditional dispensation: the Maliki school accepts wiping as a concession established by prophetic practice, but restricts it through defined conditions relating to material, coverage, purity, and the state in which the footwear was worn.",
      source: "Al-Risalah, Chapter 7: On Wiping Over Leather Socks, 7.1–7.2",
    },
  ],
  "Shafi'i": [
    {
      question: "Should “Bismillah” be recited aloud during prayer?",
      ruling:
        "In the Shafi‘i school, the basmalah is part of al-Fatihah and is recited as part of it; therefore, in prayers recited aloud, it is recited aloud.",
      reasoning:
        "Reliance of the Traveller states that the basmalah, meaning 'In the name of Allah, Most Merciful and Compassionate', is one of the verses of al-Fatihah. Since reciting al-Fatihah is an obligatory integral of the prayer in the Shafi‘i school, the basmalah is treated as part of that required recitation. The text also states that after al-Fatihah, Ameen is said aloud in prayers recited aloud and to oneself in prayers recited silently. This shows that the Shafi‘i treatment of recitation follows the audible or silent nature of the prayer. Therefore, because the basmalah is included within al-Fatihah, it follows the recitation mode of al-Fatihah: aloud in audible prayers and silently in silent prayers.",
      methodologyNote:
        "Textual classification: the ruling follows the Shafi‘i identification of the basmalah as a verse of al-Fatihah, so it is treated as part of the obligatory recitation.",
      source: "Reliance of the Traveller, Book F: Prayer, f8.17–f8.19",
      evidence: {
        type: "Qur'an",
        title: "Qur'an 1:1",
        description:
          "Referenced in the primary source during the discussion of whether the Basmalah forms part of Surah al-Fatihah.",
        url: "https://quran.com/1/1",
      },
    },
    {
      question: "Does bleeding invalidate ablution (wudu)?",
      ruling:
        "Bleeding does not invalidate wudu in the Shafi‘i school unless it exits from the front or rear private parts.",
      reasoning:
        "Reliance of the Traveller lists four causes of minor ritual impurity. The first is anything that exits from the front or rear private parts, whether usual or unusual. The other causes are loss of intellect, skin contact between a man and woman who are not unmarriageable kin, and touching human private parts with the palm or inner fingers. The text then explicitly states that ablution is not nullified by vomiting, letting blood, nosebleed, laughing during prayer, eating camel meat, or other things not discussed among the nullifiers. Therefore, ordinary bleeding from a wound, cupping, bloodletting, or nosebleed does not break wudu according to the Shafi‘i school.",
      methodologyNote:
        "Restriction to defined nullifiers: Shafi‘i reasoning limits nullification of wudu to the recognised causes listed in the school, rather than extending the ruling to external bleeding by analogy.",
      source: "Reliance of the Traveller, Book E: Purification, e7.1–e7.5",
    },
    {
      question: "Is wiping over socks permissible during ablution?",
      ruling:
        "Wiping is permissible over valid footgear that meets the Shafi‘i conditions, including thick heavy socks that prevent water from reaching the foot and are durable enough for walking; ordinary modern dress socks are not valid.",
      reasoning:
        "Reliance of the Traveller explains that wiping footgear is a dispensation that may replace washing the feet in ablution. It gives a time limit of 24 hours for a non-traveller and 72 hours for a traveller. The conditions are that the person had full ablution when first putting the footgear on, that the footgear is free of filth, covers the whole foot up to and including the anklebones, prevents water from reaching the foot, and is durable enough for walking around as travellers do when attending to their needs. The text clarifies that the material does not have to be leather: it may be leather, felt, layers of rags, thick heavy wool socks that prevent water from reaching the foot, wood, or other materials. However, it specifically excludes modern dress socks because they do not fulfil the conditions of preventing water and being sufficiently durable.",
      methodologyNote:
        "Conditional dispensation: the Shafi‘i school allows wiping only when the footwear fulfils the defined legal conditions of coverage, durability, and water resistance.",
      source: "Reliance of the Traveller, Book E: Purification, e6.1–e6.6",
    },
    {
      question: "Should “Ameen” be recited aloud after Chapter Al-Fatiha?",
      ruling:
        "In the Shafi‘i school, saying 'Ameen' after Surah Al-Fatihah is a recommended Sunnah. It is recited aloud in prayers where the Qur'an is recited aloud and silently in prayers recited quietly.",
      reasoning:
        "The Shafi‘i school considers saying 'Ameen' after Surah Al-Fatihah to be a recommended practice for both the imam and the congregation. In audible prayers, such as Fajr, Maghrib, and Isha, 'Ameen' is recited aloud immediately after completing the final verse of Al-Fatihah. In silent prayers, it is recited quietly. When praying behind an imam, followers say 'Ameen' together with the imam. If a follower is still completing their own recitation of Al-Fatihah, they repeat 'Ameen' quietly after finishing. This practice reflects the Shafi‘i emphasis on following the imam while preserving the follower's own recitation of Al-Fatihah. Therefore, the Shafi‘i position is that reciting 'Ameen' aloud in audible congregational prayers is a recommended Sunnah.",
      methodologyNote:
        "The Shafi‘i school bases this ruling on authentic Prophetic narrations regarding saying 'Ameen' after Al-Fatihah and interprets these reports as recommending audible recitation in prayers recited aloud and silent recitation in prayers recited quietly.",
      source: "Reliance of the Traveller ('Umdat al-Salik), Book f8: Description of the Prayer, Section f8.19 'Saying Ameen'.",
      evidence: {
        type: "Fiqh Manual",
        title: "Reliance of the Traveller ('Umdat al-Salik)",
        description:
          "States that 'Ameen' is recited aloud in audible prayers and quietly in silent prayers. Followers say it with the imam and repeat it quietly after completing their own recitation of Al-Fatihah if necessary.",
        url: "",
      },
    },
  ],
  Hanbali: [
    {
      question: "Should “Bismillah” be recited aloud during prayer?",
      ruling:
        "In the Hanbali school, the basmalah is recited silently before al-Fatihah and is not recited aloud in the obligatory prayer.",
      reasoning:
        "Umdat al-Fiqh presents the prayer as beginning with the opening takbir, followed by the opening supplication, seeking refuge, and then recitation. In the Hanbali school, the basmalah is treated as part of the recitation etiquette before al-Fatihah, but it is not normally pronounced aloud in the obligatory prayer. This creates a practical similarity with the Hanafi position because both treat the basmalah as something recited silently rather than aloud. However, the Hanbali reasoning is attached to the structure of prayer recitation and the transmitted manner of performing the prayer, rather than to the Shafi‘i classification of the basmalah as an audible verse of al-Fatihah. Therefore, the relied-upon Hanbali position is that the basmalah is recited, but quietly.",
      methodologyNote:
        "Textual practice and prayer form: the ruling follows the transmitted structure of the prayer and treats the basmalah as a silent recitation element rather than an audible part of al-Fatihah.",
      source: "Umdat al-Fiqh, Book of the Ritual Prayer, Description of the Ritual Prayer",
    },
    {
      question: "Does bleeding invalidate ablution (wudu)?",
      ruling:
        "In the Hanbali school, a large amount of blood or similar impurity exiting from the body invalidates wudu, while a small amount is excused.",
      reasoning:
        "Umdat al-Fiqh includes a section on the factors that annul minor ritual ablution. In the Hanbali school, the nullifiers of wudu are not limited only to what exits from the two private passages. A significant amount of impurity exiting from elsewhere in the body, such as blood, pus, or vomit, is also treated as a cause of invalidation. The important distinction is amount: small bleeding is generally overlooked, while abundant or flowing bleeding is treated as legally significant. This makes the Hanbali position closer to the Hanafi school than to the Shafi‘i and Maliki schools, because it recognises external bleeding as a possible nullifier of wudu. However, unlike a simple rule that every trace of blood breaks wudu, the Hanbali position depends on whether the amount is considered substantial.",
      methodologyNote:
        "Legal causation with qualification: the Hanbali school treats substantial external impurity as a cause of hadath, but qualifies the ruling by amount so that minor bleeding is not treated the same as abundant bleeding.",
      source: "Umdat al-Fiqh, Book of Ritual Purification, Factors that Annul the Minor Ritual Ablution",
    },
    {
      question: "Is wiping over socks permissible during ablution?",
      ruling:
        "Wiping over khuffs or valid footgear is permissible in the Hanbali school when the required conditions are met. The permission applies after the footgear has been worn in a state of complete wudu.",
      reasoning:
        "Umdat al-Fiqh discusses wiping over footwear as a recognised dispensation in purification. The Hanbali school permits wiping over khuffs or valid footgear when they are worn after complete purification and remain on the feet. The dispensation applies to minor ritual impurity, while major ritual impurity requires removing the footwear and performing ghusl. The usual Hanbali time limit is one day and night for a resident and three days and nights for a traveller. This shows that the Hanbali position accepts the prophetic concession of wiping over footwear, but controls it through legal conditions: the person must have put the footwear on after wudu, the footwear must cover the required area, and the wiping is only for minor impurity. Therefore, the Hanbali answer is permissive but conditional.",
      methodologyNote:
        "Hadith-based concession: wiping over footgear is accepted as a prophetic dispensation, but its use is limited by conditions of prior purification, coverage, and the distinction between minor and major impurity.",
      source: "Umdat al-Fiqh, Book of Ritual Purification, Wiping the Shoes",
    },
  ],
};

async function main() {
  // Clear existing development data
  await prisma.evidenceReference.deleteMany();
  await prisma.source.deleteMany();
  await prisma.opinion.deleteMany();
  await prisma.scholar.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.submittedQuestion.deleteMany();

  // Create a scholar for each of the four schools of thought
  const createdScholars = [];
  for (const scholarData of scholars) {
    const scholar = await prisma.scholar.create({
      data: {
        name: scholarData.name,
        school: scholarData.school,
        biography: scholarData.biography,
      },
    });
    createdScholars.push(scholar);
  }


  for (const topicData of topics) {
    const topic = await prisma.topic.create({
      data: {
        question: topicData.question,
        category: topicData.category,
      },
    });

    for (const scholar of createdScholars) {
      const verified = verifiedContent[scholar.school]?.find(
        (item) => item.question === topicData.question
      );

      const opinion = await prisma.opinion.create({
        data: {
        //?? means if the first thing does not work do the second
          ruling: verified?.ruling ?? "To be verified",
          reasoning:
            verified?.reasoning ??  "This section will contain the verified reasoning for this school of thought.",
          methodologyNote:
            verified?.methodologyNote ?? "To be verified",

          topicId: topic.id,
          scholarId: scholar.id,
        },
      });

      await prisma.source.create({
        data: {
          reference: verified?.source ?? "Source to be verified",
          opinionId: opinion.id,
        },
      });

       //if theres a verıfıed opınıon and theres evıdence
      if (verified?.evidence) {
        await prisma.evidenceReference.create({
          data: {
            type: verified.evidence.type,
            title: verified.evidence.title,
            description: verified.evidence.description,
            url: verified.evidence.url ?? "",
            opinionId: opinion.id,
          },
        });
      }
    }
  }

  console.log(
    `Development database seeded successfully `
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });