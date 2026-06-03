# ATS-Friendly Resume Guidelines (Design Tokens)

These guidelines serve as "design tokens" for creating an Applicant Tracking System (ATS)-friendly resume. They focus on structure, formatting, and content to ensure optimal parsability by automated systems, increasing your chances of being seen by a human recruiter.

## 1. Structure & Layout Tokens:

*   **`layout-type`**: `single-column`
    *   *Description*: **Strictly adhere to a single-column layout.**
    *   *Detail*: Multi-column layouts, sidebars, or complex grid structures often confuse ATS software, leading to scrambled or unreadable information. A simple, linear flow ensures the ATS can parse your content correctly from top to bottom.
    *   *Example*: Imagine your resume as a simple document that flows like a book page, not a magazine spread.

*   **`section-order`**: `chronological-reverse`
    *   *Description*: **List work experience, education, and other relevant sections from most recent to oldest.**
    *   *Detail*: This is the most common and ATS-preferred format. It allows recruiters and ATS to quickly identify your most recent and relevant achievements.
    *   *Example*: Your current or last job should be at the top of your "Work Experience" section, followed by previous roles in descending order of recency.

*   **`header-placement`**: `body-content`
    *   *Description*: **Place contact information and your name within the main body of the resume, not in headers or footers.**
    *   *Detail*: Some ATS might not read information placed in document headers or footers. To guarantee your name and contact details are captured, ensure they are part of the main text flow, typically at the very top of the document.
    *   *Example*:
        ```
        Dương Bảo Duy
        baoduy.duong0206@gmail.com | https://github.com/bdx0 | https://bdx0.io.vn
        ```

*   **`spacing-consistency`**: `standard`
    *   *Description*: **Maintain consistent line spacing, paragraph breaks, and margins throughout the document.**
    *   *Detail*: Irregular spacing or excessive white space can sometimes be misinterpreted by ATS, leading to parsing errors. Stick to standard document formatting.
    *   *Example*: Use consistent spacing between bullet points and sections. Avoid large, arbitrary gaps.

## 2. Typography Tokens:

*   **`font-family-primary`**: `[Arial, Calibri, Times New Roman, Georgia, Tahoma, Trebuchet, Verdana]`
    *   *Description*: **Select one professional, widely recognized, and easy-to-read font from this list.**
    *   *Detail*: These fonts are standard across most systems and are easily processed by ATS. Avoid highly decorative, custom, or obscure fonts that might not render correctly or could be skipped by the ATS.
    *   *Example*: Calibri 11pt is a safe and common choice.

*   **`font-size-body`**: `11pt` | `12pt`
    *   *Description*: **Use for the main body text to ensure readability.**
    *   *Detail*: This range provides a good balance between fitting enough information on a page and maintaining readability for both ATS and human eyes.
    *   *Example*: Keep your descriptions and bullet points within this size range.

*   **`font-size-heading`**: `14pt` | `16pt`
    *   *Description*: **Use for section headings to provide clear hierarchy.**
    *   *Detail*: Slightly larger font sizes for headings help visually break up the resume and guide the reader (and ATS) through different sections.
    *   *Example*: "WORK EXPERIENCE" could be 14pt, while your name at the top could be 18-24pt.

*   **`font-weight-heading`**: `bold`
    *   *Description*: **Section headings should be bolded for emphasis.**
    *   *Detail*: Bold text is generally recognized by ATS as a way to highlight important information or section titles.
    *   *Example*: **Work Experience**, **Education**, **Skills**.

*   **`text-alignment`**: `left`
    *   *Description*: **All text should be left-aligned for standard readability.**
    *   *Detail*: Centered or right-aligned text can sometimes cause parsing issues with older ATS. Left-alignment is the safest bet.
    *   *Example*: Ensure all your bullet points and paragraphs start from the left margin.

*   **`text-color`**: `black-on-white`
    *   *Description*: **Use black text on a white background for all content.**
    *   *Detail*: ATS primarily extracts text content and often ignores or strips away color. High contrast (black on white) ensures maximum readability for both ATS and human recruiters, regardless of display settings or printing. Avoid any other colors for text.
    *   *Example*: All headings, body text, and contact information should be black.

## 3. Content & Formatting Tokens:

*   **`section-headings`**: `[Work Experience, Education, Skills, Summary, Certifications, Projects, Awards]`
    *   *Description*: **Use only standard, universally recognized section titles.**
    *   *Detail*: ATS are programmed to look for these common headings. Creative or unique titles (e.g., "My Journey" instead of "Work Experience") might cause the ATS to miss entire sections of your resume.
    *   *Example*: Stick to "Work Experience," "Education," "Skills," "Summary," "Projects," "Awards," "Certifications," "Volunteer Experience."

*   **`bullet-style`**: `[solid-circle, open-circle, square]`
    *   *Description*: **Use simple, standard bullet points for lists of accomplishments and responsibilities.**
    *   *Detail*: Intricate, custom, or graphical bullet characters can be misinterpreted or ignored by ATS. Basic bullet points are universally recognized.
    *   *Example*: Use the default bullet point option in your word processor.

*   **`date-format`**: `[MM/YYYY, Month YYYY]`
    *   *Description*: **Maintain a consistent date format (e.g., "01/2020" or "January 2020") and place dates immediately adjacent to the corresponding entry.**
    *   *Detail*: Consistency helps ATS accurately extract employment and education timelines. Placing dates clearly with their associated entries prevents confusion.
    *   *Example*:
        ```
        Rever Corp, City, Country | Senior Software Engineer | 06/2019 – 12/2022
        Ho Chi Minh University of Science, City, Country | Bachelor in Mathematics & Computer Science | Sept 2007 – May 2013
        ```

*   **`keyword-integration`**: `natural`
    *   *Description*: **Integrate relevant keywords and phrases directly from the job description naturally into your experience and skills sections.**
    *   *Detail*: This is crucial for matching your resume to the job requirements within the ATS. Don't just list keywords; weave them into your accomplishments and responsibilities. Avoid "keyword stuffing."
    *   *Example*: If a job description mentions "project management software" and "agile methodologies," ensure these terms appear in your work experience descriptions where applicable.

*   **`avoid-graphics`**: `true`
    *   *Description*: **Do not include images, charts, graphs, icons, or other visual elements, including profile pictures.**
    *   *Detail*: ATS cannot "read" images. Any information contained within a graphic will be lost. Graphics can also disrupt the parsing of text. Profile pictures are a common non-compliance that can hinder parsing.
    *   *Example*: Instead of an icon for "phone," just list your phone number. **Never include a profile picture.**

*   **`avoid-tables`**: `true`
    *   *Description*: **Do not use tables, text boxes, or multi-column layouts for content, as these can often be misinterpreted by ATS.**
    *   *Detail*: Similar to graphics, tables, text boxes, and complex multi-column structures can break the linear flow of text, causing ATS to misread or skip content. This is particularly problematic for sections like "Skills."
    *   *Example*: If you have a "Skills" section, list skills as bullet points or comma-separated text, not in a table or a multi-column grid.

*   **`avoid-special-characters`**: `true`
    *   *Description*: **Avoid unusual symbols, accented characters, or emojis that could be misinterpreted.**
    *   *Detail*: Stick to standard alphanumeric characters and common punctuation. Some special characters might not be encoded correctly by ATS.
    *   *Example*: Use "e.g." instead of "e.g." if your word processor auto-formats it with a special character.

*   **`avoid-decorative-elements`**: `true`
    *   *Description*: **Avoid decorative lines, borders, shading, or other non-essential visual elements.**
    *   *Detail*: While seemingly minor, these elements can sometimes be misinterpreted by ATS as complex formatting, potentially leading to parsing errors or a less clean text extraction. Simplicity is key for optimal ATS compatibility.
    *   *Example*: Do not use horizontal lines to separate sections; rely on spacing, bolding, and font size for visual hierarchy.

*   **`file-format-preference`**: `[docx, pdf-ats-optimized]`
    *   *Description*: **Save your resume as a .docx file. If a PDF is required, ensure it is a truly ATS-optimized PDF.**
    *   *Detail*: .docx is generally the most ATS-friendly format. If a PDF is requested, ensure it's a "searchable" PDF created by saving directly from a word processor, not a scanned image of a document. Scanned PDFs are images and are unreadable by ATS.
    *   *Example*: Always check the job application for preferred file formats. If not specified, .docx is usually safest.

## 4. Language & Tone Tokens:

*   **`language-clarity`**: `concise-direct`
    *   *Description*: **Use clear, concise, and direct language.**
    *   *Detail*: Get straight to the point. Avoid jargon where simpler terms suffice, but use industry-specific terminology when it's a keyword from the job description.
    *   *Example*: Instead of "I want bridging the gap between technology and human interaction. I will make the software more simpler, more better," write "Passionate about bridging the gap between technology and human interaction to create simpler, better software."

*   **`action-verbs`**: `strong-impactful`
    *   *Description*: **Start bullet points with strong action verbs.**
    *   *Detail*: Action verbs (e.g., "Developed," "Managed," "Implemented," "Achieved") make your accomplishments sound more dynamic and impactful.
    *   *Example*: "Developed mobile app using Flutter."

*   **`proofreading-standard`**: `error-free`
    *   *Description*: **Thoroughly proofread for any spelling, grammar, or punctuation errors.**
    *   *Detail*: Even minor errors can reflect poorly on your attention to detail and professionalism. ATS might also misinterpret misspelled keywords.
    *   *Example*: Use spell-check and grammar-check tools, and ideally, have another person review your resume.
