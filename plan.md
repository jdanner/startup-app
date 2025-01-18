Note: John is the product manager and cursor AI is the developer
Note: Always include git and filesystem commands in your responses if John needs to do them

# Startup Funding Application Platform Plan

## Overview
Create a streamlined platform for startups to submit funding applications with comprehensive data and metrics.

## Core Components

### 1. Application Portal
- Secure login/authentication system
- Single-step application form
- File upload capabilities for pitch decks/memos
- Save applicaiton and email new applications to john as they come in

### 2. Required Submissions
- Pitch deck/memo upload (PDF, PPT formats) which should include at least team members, problem, solution, and traction
- Company website/app URL
- Product demo video/loom (optional)
- current metrics
- Funding history and current raise details

### 3. Metrics Dashboard
- Report card from this doc --- https://docs.google.com/document/d/1pnHxkdcoXyr3pbzWywie3q5MKWYGF-FdU6Wa4oZBxgU/edit?tab=t.0
- Experiments/week

### 4. AI Score
- AI score from this doc --- https://docs.google.com/document/d/1pnHxkdcoXyr3pbzWywie3q5MKWYGF-FdU6Wa4oZBxgU/edit?tab=t.0
- Evaluate product video/app/website
- One paragraph assessment of the application included in the email and saved with app

## Technical Requirements

### Frontend
- React-based web application
- Responsive design
- Secure file upload system
- Real-time validation
- Progress indicators

### Backend
- Render server
- PostgreSQL database
- AWS S3 for file storage
- Authentication system
- API endpoints for all CRUD operations

### Security
- End-to-end encryption
- Secure file storage
- Access control
- Data backup systems
- GDPR compliance

## User Flow
1. Simple form with required fields
2. Company name, url, founder names, and email
3. Uploads deck, memo, and video (at least one required)
5. Completes report card 
6. Submits application
7. Receives confirmation

## Timeline - today

## 1/15/24

Key Accomplishments:
1. Set up EmailJS for application notifications
   - Service ID: service_gl3xzva
   - Template ID: template_h62tu28
   - Configured template with company info, URLs, and metrics

2. Implemented file uploads
   - Created API endpoint for file storage
   - Files stored in Render disk storage (1GB)
   - Files accessible via /uploads directory
   - URLs included in email notifications

3. Added data persistence
   - Applications stored as JSON files
   - Using Render disk storage
   - Each application includes timestamp and file URLs

4. UX Improvements
   - Changed sample data shortcut from 'D' to 'Ctrl+D'
   - Added health check endpoint to API
   - Added uploads-test endpoint for debugging

Infrastructure Decisions:
1. Using Render's disk storage instead of S3 for MVP
2. EmailJS for email handling (simpler than setting up SMTP)
3. Static file hosting for uploads
4. JSON files for data storage (can migrate to DB later)

Next Steps:
1. Monitor disk usage
2. Consider database migration if application volume grows
3. Add file type validation
4. Implement file size limits

## Next Steps (1/16/24)

1. Create danners.org homepage
   - Clean, minimal design
   - Two main sections: Startups and Non-Profits
   - Navigation between sections

2. Startups Section
   - List of portfolio companies from jobs work
   - Link to startup application form
   - Brief description of investment thesis
   - Add metrics/report card explanation

3. Non-Profits Section
   - TBD based on requirements

4. Domain Configuration
   - Connect danners.org to Render
   - Set up SSL
   - Configure subdomains if needed

5. Application Form Improvements
   - Add file size limits (25MB)
   - Improve file type validation
   - Monitor disk usage
   - Consider database migration path

Would you like me to:
1. Create initial homepage mockups
2. Research domain configuration for Render
3. Something else?

## Future Enhancements
- API integration with common startup tools
- Automated initial screening
- Machine learning for application scoring
- Integration with due diligence tools
- Mobile app development
- Analytics dashboard for investors

## Questions to Clarify
1. Email Configuration
   - Should notifications go to multiple email addresses besides John?
   no just john@danners.org
   - What email format/template should be used for notifications?
   subject: new application from [company name]
   body: [company name]
   [company website]
   [company email]
   [company url]
   [company video]
   [AI summary and score]

   - Should there be auto-replies to applicants?
   no

2. File Requirements
   - Maximum file size limits for uploads?
   25m
   - Should we enforce specific deck/memo templates?
   not yet
   - Should we validate minimum deck content (team, problem, solution, traction)?
   yes, listed in plan.md

3. Report Card Integration
   - Should the report card form be embedded or linked?
   embedded
   - Do we need to store historical report card data?
   do you mean from previous applicants?  yes, from previous applicants
   - Should applicants be able to update their report card after submission?
   no

4. AI Scoring
   - What specific metrics should the AI evaluate?
   listed in plan.md
   - Should the AI score be visible to applicants?
   no
   - What API/model should we use for the AI evaluation?
   let's use claude 3.5 sonnet

5. Access & Security
   - Do we need an admin dashboard?
   no
   - Should applications be accessible after submission?
   no
   - How long should we retain application data?
   indefinitely

6. Form Validation
   - Minimum/maximum text lengths for fields?
   let's get it up on screen and discuss
   - Required vs optional fields?
   let's get it up on screen and discuss
   - Should we validate company URLs are live?
   yes, in your evaluation of the application

7. General
   - Budget constraints for the project?
   we are building this today, no budget
   - Target launch date?
   today
   - Expected volume of applications?
   a few per week

8. Immediate UI Questions
   - Should we use a multi-page form or single scrolling page?
   single
   - Do we need a preview step before submission?
   no
   - Should file uploads be drag-and-drop or button-based or both?
select file to upload
   - Should we show a progress indicator for file uploads?
   no
   - What happens if the AI evaluation takes more than a few seconds?
 send email once evaluation is complete

9. MVP Feature Priority
   - Can we start without the AI scoring and add it after basic submission works?
   yes and validate basic emailing as well before worrying about scoring
   - Should we implement file validation (checking deck content) in phase 1 or later?
   validate on upload and don't allow submission if it doesn't work
   - Do we need the report card integration on day 1?
   i don't know what that means.  the report card metrics will be entered into the form as part of the submission.  to be really clear, here is the report card from the doc: Stage
Metric
A
B
C
Your result
Your Grade
Need
% of ICPs who visibly get excited (not just polite) when the pain point is described
80%
70%
60%




Value Proposition
% of visitors who experience the magic
80%
70%
60%




Magic
% of visitors who see your magic who 
take the next step
80%
60%
40%




Activation
% of visitors who saw your magic, who successfully became active users
80%
60%
40%




Intrigued
% of activated users who retain Day 7
80%
60%
40%




Habit
% of Day 7 users who retain Day 30
80%
60%
40%




Growth Loops
How many additional users does each new user create?
.8
.6
.4




Growth
Month over Month organic growth (exclude paid growth)
20%
15%
10%




Channel
Drive 1000 organic weekly visitors to your site
1000
800
600




Engagement
Average visits per week
7
5
3





Monetization 
% top of funnel who become paid customers
10%
7%
3%




GPA









10. Email Integration
    - Should we use SendGrid, AWS SES, or another email service?
    no because it's just going to me
    - Do we need to track if emails are delivered/opened?
    no, just going to me
    - Should attachments be included in the email or just links to the uploaded files?
    just links to the uploaded files

11. Form Implementation Details
    - Should the report card metrics be a simple form with numeric inputs for each metric?
    yes and mouse-over descriptions of the metric
    - Should we validate the numeric ranges for each metric (e.g., 0-100% for percentages)?
    yes
    - Do we need to calculate the GPA automatically?
    yes
    - Should we show the A/B/C thresholds next to each input?
    no

12. MVP Sequence
yes, all these make sense except 4 which is part of the submission
    - Shall we start with this order?
      1. Basic form with company info + file upload
      2. Email notification
      3. File storage
      4. Report card metrics form
      i don't know what that means.  report card is part of the submission
      5. AI evaluation
    
13. Development Environment
    - Should we start with a local development setup or directly on Render?
    start local.  
    - Do you have AWS credentials ready for S3 setup?
    doesn't render have an s3 equivalent?

14. Storage Clarification
    - Would you like to use Render's built-in object storage instead of AWS S3?
    yes
    - Should we implement file deletion after email is sent, or keep files stored?
    keep files stored
15. Report Card Form Structure
    - For each metric (Need, Value Proposition, etc.), should we show:
      * Metric name
      * Description (on hover)
      * Single input field for "Your result"
      * Hidden A/B/C thresholds (used for GPA calculation)
      these don't need to be in the UI, just use them when you score
    - Should we show the calculated grade for each metric as they input values?
    no, you don't need to show in the UI, just collect the metrics and calculate this score when you are scoring

16. MVP Form Fields
    - Company section:
      * Company name
      * Website URL
      * Founder names
      * Email
    - File uploads:
      * Deck/memo (required)
      * Demo video/loom (optional)
    - Metrics section:
      * Need (%)
      * Value Proposition (%)
      * Magic (%)
      * Activation (%)
      * Intrigued (%)
      * Habit (%)
      * Growth Loops (number)
      * Growth (%)
      * Channel (number)
      * Engagement (number)
      * Monetization (%)
    - Experiments per week (number)
    - Optional experiment spreadsheet/doc upload

17. Immediate Action Items
    1. Create React form layout
    2. Add file upload with Render storage
    3. Setup basic email sending
    4. Test submission flow
    
Would you like me to start with the React implementation?
Yes this is a good plan.