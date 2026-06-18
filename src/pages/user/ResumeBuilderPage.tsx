// ============================================
// Resume Builder Page
// Interactive multi-template resume creator
// ============================================

import React, { useState, useMemo } from 'react';
import {
    FileText,
    Sparkles,
    Plus,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Printer,
    User,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Globe,
    Award,
    GraduationCap,
    Briefcase,
    Code,
    CheckCircle,
    Lightbulb,
    FileSpreadsheet,
    PlusCircle,
    X
} from 'lucide-react';
import './ResumeBuilderPage.css';

// Interfaces
interface WorkExperience {
    id: string;
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Project {
    id: string;
    title: string;
    techStack: string;
    description: string;
}

interface Education {
    id: string;
    degree: string;
    institution: string;
    endDate: string;
    gpa?: string;
}

interface Certification {
    id: string;
    name: string;
    issuer: string;
    year: string;
}

interface Achievement {
    id: string;
    description: string;
}

const ResumeBuilderPage: React.FC = () => {
    // Current Form Tab
    const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'projects' | 'education' | 'skills' | 'ats'>('personal');

    // Selected Template
    const [selectedTemplate, setSelectedTemplate] = useState<1 | 2 | 3 | 4 | 5>(1);

    // Form State
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@email.com');
    const [phone, setPhone] = useState('+1 (555) 019-2834');
    const [location, setLocation] = useState('San Francisco, CA');
    const [linkedin, setLinkedin] = useState('linkedin.com/in/johndoe');
    const [github, setGithub] = useState('github.com/johndoe');
    const [portfolio, setPortfolio] = useState('johndoe.dev');
    const [targetRole, setTargetRole] = useState('Full Stack Developer');
    const [summary, setSummary] = useState(
        'Results-driven Software Engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud platforms. Proven track record of optimizing application performance by 40% and leading cross-functional teams.'
    );

    // Dynamic Lists State
    const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'JavaScript']);
    const [skillInput, setSkillInput] = useState('');

    const [experiences, setExperiences] = useState<WorkExperience[]>([
        {
            id: '1',
            company: 'TechCorp Inc.',
            title: 'Senior Developer',
            startDate: '2022-03',
            endDate: 'Present',
            description: 'Led a team of 4 engineers to rebuild the core SaaS platform using React and TypeScript, resulting in a 35% decrease in load times. Orchestrated migration to AWS microservices, improving uptime to 99.99%.'
        },
        {
            id: '2',
            company: 'StartupXYZ',
            title: 'Full Stack Engineer',
            startDate: '2020-06',
            endDate: '2022-03',
            description: 'Developed and maintained 15+ REST APIs using Node.js and Express. Implemented robust JWT authentication and integrated stripe billing system, boosting subscription revenues by 20%.'
        }
    ]);

    const [projects, setProjects] = useState<Project[]>([
        {
            id: '1',
            title: 'JobMatcher AI Platform',
            techStack: 'React, Node.js, Express, MongoDB, FastAPI',
            description: 'Designed an AI-powered portal matching resumes with jobs using sentence embeddings. Reduced candidate screening times by 50% for recruiters.'
        }
    ]);

    const [educations, setEducations] = useState<Education[]>([
        {
            id: '1',
            degree: 'Bachelor of Science in Computer Science',
            institution: 'Stanford University',
            endDate: '2020-05',
            gpa: '3.8/4.0'
        }
    ]);

    const [certifications, setCertifications] = useState<Certification[]>([
        {
            id: '1',
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            year: '2023'
        }
    ]);

    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: '1',
            description: 'First Place Winner at Stanford Hackathon 2019 out of 120 teams.'
        }
    ]);

    // Role-specific Industry Keywords Mapping
    const keywordDatabase: Record<string, string[]> = {
        'frontend developer': ['react', 'typescript', 'javascript', 'html', 'css', 'next.js', 'redux', 'tailwind', 'webpack', 'sass', 'responsive design', 'rest api', 'jest', 'git'],
        'backend developer': ['node.js', 'express', 'python', 'django', 'java', 'spring boot', 'sql', 'postgresql', 'mongodb', 'docker', 'kubernetes', 'aws', 'rest api', 'graphql', 'microservices', 'redis', 'git'],
        'full stack developer': ['react', 'node.js', 'typescript', 'javascript', 'express', 'sql', 'mongodb', 'postgresql', 'aws', 'docker', 'rest api', 'graphql', 'next.js', 'git', 'ci/cd'],
        'software engineer': ['algorithms', 'data structures', 'system design', 'java', 'python', 'c++', 'git', 'agile', 'scrum', 'ci/cd', 'aws', 'docker', 'testing', 'code review'],
        'data scientist': ['python', 'r', 'sql', 'machine learning', 'deep learning', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'data visualization', 'tableau', 'statistics', 'spark'],
        'devops engineer': ['docker', 'kubernetes', 'aws', 'terraform', 'jenkins', 'ci/cd', 'linux', 'bash', 'ansible', 'monitoring', 'prometheus', 'grafana', 'git', 'python'],
        'product manager': ['product roadmap', 'agile', 'scrum', 'user stories', 'market research', 'analytics', 'sql', 'jira', 'confluence', 'ui/ux', 'stakeholder management', 'a/b testing']
    };

    // Skills Add / Remove
    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanSkill = skillInput.trim();
        if (cleanSkill && !skills.includes(cleanSkill)) {
            setSkills([...skills, cleanSkill]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    // Work Experience Add / Remove
    const handleAddExperience = () => {
        const newExp: WorkExperience = {
            id: Date.now().toString(),
            company: '',
            title: '',
            startDate: '',
            endDate: '',
            description: ''
        };
        setExperiences([...experiences, newExp]);
    };

    const handleUpdateExperience = (id: string, field: keyof WorkExperience, value: string) => {
        setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const handleRemoveExperience = (id: string) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
    };

    // Projects Add / Remove
    const handleAddProject = () => {
        const newProj: Project = {
            id: Date.now().toString(),
            title: '',
            techStack: '',
            description: ''
        };
        setProjects([...projects, newProj]);
    };

    const handleUpdateProject = (id: string, field: keyof Project, value: string) => {
        setProjects(projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
    };

    const handleRemoveProject = (id: string) => {
        setProjects(projects.filter(proj => proj.id !== id));
    };

    // Education Add / Remove
    const handleAddEducation = () => {
        const newEdu: Education = {
            id: Date.now().toString(),
            degree: '',
            institution: '',
            endDate: '',
            gpa: ''
        };
        setEducations([...educations, newEdu]);
    };

    const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
        setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
    };

    const handleRemoveEducation = (id: string) => {
        setEducations(educations.filter(edu => edu.id !== id));
    };

    // Certifications Add / Remove
    const handleAddCert = () => {
        const newCert: Certification = {
            id: Date.now().toString(),
            name: '',
            issuer: '',
            year: ''
        };
        setCertifications([...certifications, newCert]);
    };

    const handleUpdateCert = (id: string, field: keyof Certification, value: string) => {
        setCertifications(certifications.map(cert => cert.id === id ? { ...cert, [field]: value } : cert));
    };

    const handleRemoveCert = (id: string) => {
        setCertifications(certifications.filter(cert => cert.id !== id));
    };

    // Achievements Add / Remove
    const handleAddAchievement = () => {
        const newAch: Achievement = {
            id: Date.now().toString(),
            description: ''
        };
        setAchievements([...achievements, newAch]);
    };

    const handleUpdateAchievement = (id: string, value: string) => {
        setAchievements(achievements.map(ach => ach.id === id ? { ...ach, description: value } : ach));
    };

    const handleRemoveAchievement = (id: string) => {
        setAchievements(achievements.filter(ach => ach.id !== id));
    };

    // Trigger Print
    const handlePrint = () => {
        window.print();
    };

    // Local ATS Scoring logic
    const atsScoreResult = useMemo(() => {
        let score = 0;
        const suggestions: Array<{ category: string; message: string; priority: 'high' | 'medium' | 'low' }> = [];
        const breakdown = {
            completeness: 0,
            contactInfo: 0,
            quantification: 0,
            keywords: 0
        };

        // 1. Completeness of standard sections (max 35 pts)
        let sectionsScore = 0;
        const sectionsToCheck = [
            { name: 'Summary', check: summary.trim().length > 20 },
            { name: 'Skills', check: skills.length > 0 },
            { name: 'Work Experience', check: experiences.length > 0 && experiences.some(e => e.company && e.title && e.description) },
            { name: 'Projects', check: projects.length > 0 && projects.some(p => p.title && p.description) },
            { name: 'Education', check: educations.length > 0 && educations.some(edu => edu.degree && edu.institution) },
            { name: 'Certifications', check: certifications.length > 0 && certifications.some(c => c.name) },
            { name: 'Achievements', check: achievements.length > 0 && achievements.some(a => a.description) }
        ];

        sectionsToCheck.forEach(section => {
            if (section.check) {
                sectionsScore += 5;
            } else {
                suggestions.push({
                    category: 'Completeness',
                    message: `Add a complete '${section.name}' section to make your resume fully comprehensive.`,
                    priority: section.name === 'Work Experience' || section.name === 'Skills' ? 'high' : 'medium'
                });
            }
        });
        breakdown.completeness = Math.round((sectionsScore / 35) * 100);
        score += sectionsScore;

        // 2. Contact details present (max 15 pts)
        let contactScore = 0;
        const contactsToCheck = [
            { field: 'Email', val: email, pts: 3 },
            { field: 'Phone', val: phone, pts: 3 },
            { field: 'Location', val: location, pts: 3 },
            { field: 'LinkedIn', val: linkedin, pts: 3 },
            { field: 'GitHub or Portfolio', val: github || portfolio, pts: 3 }
        ];
        contactsToCheck.forEach(c => {
            if (c.val.trim().length > 0) {
                contactScore += c.pts;
            } else {
                suggestions.push({
                    category: 'Contact Information',
                    message: `Provide your '${c.field}' so recruiters can easily reach out to you.`,
                    priority: 'high'
                });
            }
        });
        breakdown.contactInfo = Math.round((contactScore / 15) * 100);
        score += contactScore;

        // 3. Quantifiable metrics in experience & projects (max 20 pts)
        let metricsCount = 0;
        const metricRegex = /\b\d+(%|\+)?\b|\b\d+\s*(percent|years|months|users|revenue|companies|metrics|dollar|usd)\b|\$\d+/i;

        experiences.forEach(exp => {
            if (metricRegex.test(exp.description)) metricsCount++;
        });
        projects.forEach(proj => {
            if (metricRegex.test(proj.description)) metricsCount++;
        });

        const quantificationScore = Math.min(20, metricsCount * 5);
        if (quantificationScore < 15) {
            suggestions.push({
                category: 'Quantified Achievements',
                message: 'Add measurable metrics (e.g., percentages, dollar amounts, project scales) to your work description to prove your impact.',
                priority: 'high'
            });
        }
        breakdown.quantification = Math.round((quantificationScore / 20) * 100);
        score += quantificationScore;

        // 4. Keyword matching based on Target Job Role (max 30 pts)
        const targetRoleLower = targetRole.toLowerCase();
        let matchedKeywords: string[] = [];
        let missingKeywords: string[] = [];
        let keywordScore = 0;

        // Find matches in user's role keyword database
        let dbKey = Object.keys(keywordDatabase).find(key => targetRoleLower.includes(key) || key.includes(targetRoleLower));
        // Fallback to 'software engineer' if no match
        if (!dbKey) dbKey = 'software engineer';
        const expectedKeywords = keywordDatabase[dbKey];

        // Combine all resume content to scan
        const resumeFullContent = `
            ${summary}
            ${skills.join(' ')}
            ${experiences.map(e => `${e.title} ${e.company} ${e.description}`).join(' ')}
            ${projects.map(p => `${p.title} ${p.techStack} ${p.description}`).join(' ')}
        `.toLowerCase();

        expectedKeywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i');
            if (regex.test(resumeFullContent)) {
                matchedKeywords.push(kw);
            } else {
                missingKeywords.push(kw);
            }
        });

        if (expectedKeywords.length > 0) {
            const matchRatio = matchedKeywords.length / expectedKeywords.length;
            keywordScore = Math.round(matchRatio * 30);
        } else {
            keywordScore = 20;
        }

        if (missingKeywords.length > 0) {
            suggestions.push({
                category: 'Keywords',
                message: `Include these highly relevant skills/keywords for your target role: ${missingKeywords.slice(0, 5).join(', ')}.`,
                priority: missingKeywords.length > 5 ? 'high' : 'medium'
            });
        }
        breakdown.keywords = Math.round((keywordScore / 30) * 100);
        score += keywordScore;

        return {
            overall: Math.round(score),
            breakdown,
            matchedKeywords,
            missingKeywords,
            suggestions: suggestions.sort((a, b) => {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
        };
    }, [name, email, phone, location, linkedin, github, portfolio, targetRole, summary, skills, experiences, projects, educations, certifications, achievements]);

    const getScoreClass = (score: number) => {
        if (score >= 80) return 'excellent';
        if (score >= 60) return 'good';
        return 'warning';
    };

    return (
        <div className="resume-builder-page dashboard-page">
            <div className="resume-builder-header">
                <div>
                    <h1><FileText size={28} /> AI Resume Builder</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>Create, score, and export an ATS-optimized professional resume</p>
                </div>
                <div className="resume-header-actions">
                    <div className={`ats-score-badge-inline ${getScoreClass(atsScoreResult.overall)}`}>
                        <Sparkles size={16} />
                        ATS Score: {atsScoreResult.overall}/100
                    </div>
                    <button className="btn-primary" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Printer size={18} />
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="resume-builder-grid">
                {/* Left Side: Form Editor */}
                <div className="resume-card">
                    {/* Tabs Navigation */}
                    <div className="resume-tabs-nav">
                        <button
                            className={`resume-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('personal')}
                        >
                            <User size={16} /> Contact
                        </button>
                        <button
                            className={`resume-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                            onClick={() => setActiveTab('skills')}
                        >
                            <Code size={16} /> Skills
                        </button>
                        <button
                            className={`resume-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                            onClick={() => setActiveTab('experience')}
                        >
                            <Briefcase size={16} /> Experience
                        </button>
                        <button
                            className={`resume-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <FileSpreadsheet size={16} /> Projects
                        </button>
                        <button
                            className={`resume-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                            onClick={() => setActiveTab('education')}
                        >
                            <GraduationCap size={16} /> Edu & Certs
                        </button>
                        <button
                            className={`resume-tab-btn ${activeTab === 'ats' ? 'active' : ''}`}
                            onClick={() => setActiveTab('ats')}
                        >
                            <Sparkles size={16} /> ATS Analysis
                        </button>
                    </div>

                    {/* Tab 1: Personal Details */}
                    {activeTab === 'personal' && (
                        <div>
                            <h3 className="card-title"><User size={20} /> Personal Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-input-text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Target Job Role</label>
                                    <input
                                        type="text"
                                        className="form-input-text"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        placeholder="e.g. Software Engineer"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        className="form-input-text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@email.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-input-text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+1 (555) 012-3456"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    className="form-input-text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="City, State"
                                />
                            </div>
                            <h3 className="card-title" style={{ marginTop: 'var(--spacing-5)' }}><Globe size={20} /> Professional Profiles</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>LinkedIn URL</label>
                                    <input
                                        type="text"
                                        className="form-input-text"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        placeholder="linkedin.com/in/username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>GitHub URL</label>
                                    <input
                                        type="text"
                                        className="form-input-text"
                                        value={github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        placeholder="github.com/username"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Portfolio / Personal Website</label>
                                <input
                                    type="text"
                                    className="form-input-text"
                                    value={portfolio}
                                    onChange={(e) => setPortfolio(e.target.value)}
                                    placeholder="yourwebsite.com"
                                />
                            </div>
                            <div className="form-navigation">
                                <div></div>
                                <button className="btn-primary" onClick={() => setActiveTab('skills')}>
                                    Next: Skills <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Skills & Summary */}
                    {activeTab === 'skills' && (
                        <div>
                            <h3 className="card-title"><FileText size={20} /> Professional Summary</h3>
                            <div className="form-group">
                                <label>Career Objective / Summary</label>
                                <textarea
                                    className="form-textarea"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    placeholder="Describe your career goals, strengths, and professional background..."
                                />
                            </div>

                            <h3 className="card-title" style={{ marginTop: 'var(--spacing-6)' }}><Code size={20} /> Technical Skills</h3>
                            <form onSubmit={handleAddSkill} className="skills-input-container">
                                <input
                                    type="text"
                                    className="form-input-text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    placeholder="Add skill (e.g. React, Python, AWS)"
                                />
                                <button type="submit" className="btn-primary" style={{ padding: '0 var(--spacing-4)' }}>
                                    <Plus size={16} /> Add
                                </button>
                            </form>

                            <div className="skills-list" style={{ marginTop: 'var(--spacing-3)' }}>
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="skill-badge">
                                        {skill}
                                        <button type="button" onClick={() => handleRemoveSkill(skill)}>
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                                {skills.length === 0 && (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>No skills added yet.</span>
                                )}
                            </div>

                            <div className="form-navigation">
                                <button className="btn-secondary" onClick={() => setActiveTab('personal')}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <button className="btn-primary" onClick={() => setActiveTab('experience')}>
                                    Next: Experience <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Work Experience */}
                    {activeTab === 'experience' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                                <h3 className="card-title" style={{ marginBottom: 0 }}><Briefcase size={20} /> Work Experience</h3>
                                <button className="btn-secondary" onClick={handleAddExperience} style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                    <Plus size={14} /> Add Experience
                                </button>
                            </div>

                            <div className="dynamic-list">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="dynamic-item-card">
                                        <button className="btn-remove-item" onClick={() => handleRemoveExperience(exp.id)} title="Remove Experience">
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={exp.company}
                                                    onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                                                    placeholder="e.g. Google"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Job Title</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={exp.title}
                                                    onChange={(e) => handleUpdateExperience(exp.id, 'title', e.target.value)}
                                                    placeholder="e.g. Software Engineer"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input
                                                    type="month"
                                                    className="form-input-text"
                                                    value={exp.startDate}
                                                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={exp.endDate}
                                                    onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                                                    placeholder="e.g. 2024-05 or Present"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Responsibilities & Quantified Achievements</label>
                                            <textarea
                                                className="form-textarea"
                                                value={exp.description}
                                                onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                                                placeholder="Write bullet points detailing your key contributions, tech stack, and measurable accomplishments (e.g. 'Boosted performance by 25%')..."
                                                style={{ minHeight: '80px' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {experiences.length === 0 && (
                                    <button className="btn-add-item" onClick={handleAddExperience}>
                                        <PlusCircle size={16} /> Add your first work experience
                                    </button>
                                )}
                            </div>

                            <div className="form-navigation">
                                <button className="btn-secondary" onClick={() => setActiveTab('skills')}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <button className="btn-primary" onClick={() => setActiveTab('projects')}>
                                    Next: Projects <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Projects */}
                    {activeTab === 'projects' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                                <h3 className="card-title" style={{ marginBottom: 0 }}><FileSpreadsheet size={20} /> Projects</h3>
                                <button className="btn-secondary" onClick={handleAddProject} style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                    <Plus size={14} /> Add Project
                                </button>
                            </div>

                            <div className="dynamic-list">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="dynamic-item-card">
                                        <button className="btn-remove-item" onClick={() => handleRemoveProject(proj.id)} title="Remove Project">
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Project Title</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={proj.title}
                                                    onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                                                    placeholder="e.g. AI Chatbot"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Technologies Used</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={proj.techStack}
                                                    onChange={(e) => handleUpdateProject(proj.id, 'techStack', e.target.value)}
                                                    placeholder="e.g. React, Python, Flask"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Description & Results</label>
                                            <textarea
                                                className="form-textarea"
                                                value={proj.description}
                                                onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                                                placeholder="Describe the project objective, your implementation, and metrics achieved..."
                                                style={{ minHeight: '80px' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {projects.length === 0 && (
                                    <button className="btn-add-item" onClick={handleAddProject}>
                                        <PlusCircle size={16} /> Add your first project
                                    </button>
                                )}
                            </div>

                            <div className="form-navigation">
                                <button className="btn-secondary" onClick={() => setActiveTab('experience')}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <button className="btn-primary" onClick={() => setActiveTab('education')}>
                                    Next: Education <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Education, Certs & Achievements */}
                    {activeTab === 'education' && (
                        <div>
                            {/* Education List */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                                <h3 className="card-title" style={{ marginBottom: 0 }}><GraduationCap size={20} /> Education</h3>
                                <button className="btn-secondary" onClick={handleAddEducation} style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="dynamic-list" style={{ marginBottom: 'var(--spacing-5)' }}>
                                {educations.map((edu) => (
                                    <div key={edu.id} className="dynamic-item-card">
                                        <button className="btn-remove-item" onClick={() => handleRemoveEducation(edu.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Degree & Major</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={edu.degree}
                                                    onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                                                    placeholder="e.g. BS in Computer Science"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Institution</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={edu.institution}
                                                    onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                                                    placeholder="e.g. Stanford University"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Graduation Date</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={edu.endDate}
                                                    onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
                                                    placeholder="e.g. 2022-05"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>GPA / Class (Optional)</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={edu.gpa}
                                                    onChange={(e) => handleUpdateEducation(edu.id, 'gpa', e.target.value)}
                                                    placeholder="e.g. 3.9/4.0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Certifications List */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                                <h3 className="card-title" style={{ marginBottom: 0 }}><Award size={20} /> Certifications</h3>
                                <button className="btn-secondary" onClick={handleAddCert} style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="dynamic-list" style={{ marginBottom: 'var(--spacing-5)' }}>
                                {certifications.map((cert) => (
                                    <div key={cert.id} className="dynamic-item-card">
                                        <button className="btn-remove-item" onClick={() => handleRemoveCert(cert.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Certification Name</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={cert.name}
                                                    onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)}
                                                    placeholder="e.g. AWS Developer Associate"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Issuing Organization</label>
                                                <input
                                                    type="text"
                                                    className="form-input-text"
                                                    value={cert.issuer}
                                                    onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                                                    placeholder="e.g. Amazon Web Services"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Year Earned</label>
                                            <input
                                                type="text"
                                                className="form-input-text"
                                                value={cert.year}
                                                onChange={(e) => handleUpdateCert(cert.id, 'year', e.target.value)}
                                                placeholder="e.g. 2023"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Achievements List */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                                <h3 className="card-title" style={{ marginBottom: 0 }}><Award size={20} /> Achievements</h3>
                                <button className="btn-secondary" onClick={handleAddAchievement} style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="dynamic-list">
                                {achievements.map((ach) => (
                                    <div key={ach.id} className="dynamic-item-card">
                                        <button className="btn-remove-item" onClick={() => handleRemoveAchievement(ach.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label>Achievement Description</label>
                                            <input
                                                type="text"
                                                className="form-input-text"
                                                value={ach.description}
                                                onChange={(e) => handleUpdateAchievement(ach.id, e.target.value)}
                                                placeholder="e.g. Published a research paper, Won a major hackathon..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-navigation">
                                <button className="btn-secondary" onClick={() => setActiveTab('projects')}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <button className="btn-primary" onClick={() => setActiveTab('ats')}>
                                    Next: ATS Analysis <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab 6: ATS Analysis Panel */}
                    {activeTab === 'ats' && (
                        <div>
                            <h3 className="card-title"><Sparkles size={20} /> ATS Analysis & Feedback</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                Local analysis of your resume structure, keyword matching, contact points, and score metrics.
                            </p>

                            <div className="ats-panel-grid">
                                <div className="ats-panel-circle-wrapper">
                                    <div className="ats-panel-circle">
                                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                                            <circle cx="50" cy="50" r="42" stroke="var(--color-bg-tertiary)" strokeWidth="8" fill="transparent" />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="42"
                                                stroke={
                                                    atsScoreResult.overall >= 80 ? 'var(--color-success)' :
                                                    atsScoreResult.overall >= 60 ? 'var(--color-primary)' : 'var(--color-warning)'
                                                }
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={`${atsScoreResult.overall * 2.64} 264`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="ats-panel-circle-value">
                                            <span className="ats-panel-score">{atsScoreResult.overall}</span>
                                            <span className="ats-panel-label">Score / 100</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="ats-panel-details">
                                    <h4 style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-sm)' }}>Breakdown</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                                                <span>Section Completeness</span>
                                                <span>{atsScoreResult.breakdown.completeness}%</span>
                                            </div>
                                            <div className="ats-progress-bar" style={{ height: '6px' }}>
                                                <div className="ats-progress-fill high" style={{ width: `${atsScoreResult.breakdown.completeness}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                                                <span>Contact Details Info</span>
                                                <span>{atsScoreResult.breakdown.contactInfo}%</span>
                                            </div>
                                            <div className="ats-progress-bar" style={{ height: '6px' }}>
                                                <div className="ats-progress-fill high" style={{ width: `${atsScoreResult.breakdown.contactInfo}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                                                <span>Quantifiable Achievements</span>
                                                <span>{atsScoreResult.breakdown.quantification}%</span>
                                            </div>
                                            <div className="ats-progress-bar" style={{ height: '6px' }}>
                                                <div className="ats-progress-fill medium" style={{ width: `${atsScoreResult.breakdown.quantification}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                                                <span>Role Keywords Overlap</span>
                                                <span>{atsScoreResult.breakdown.keywords}%</span>
                                            </div>
                                            <div className="ats-progress-bar" style={{ height: '6px' }}>
                                                <div className="ats-progress-fill high" style={{ width: `${atsScoreResult.breakdown.keywords}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="card-title" style={{ marginTop: 'var(--spacing-6)', fontSize: 'var(--font-size-base)' }}>
                                <Lightbulb size={18} /> Actionable Recommendations
                            </h4>
                            <div className="ats-suggestions-list-inline">
                                {atsScoreResult.suggestions.map((suggestion, idx) => (
                                    <div key={idx} className={`ats-suggestion-item-inline ${suggestion.priority}`}>
                                        <div className="ats-suggestion-text">
                                            <div className="ats-suggestion-category">{suggestion.category}</div>
                                            <div>{suggestion.message}</div>
                                        </div>
                                    </div>
                                ))}
                                {atsScoreResult.suggestions.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: 'var(--spacing-4)', color: 'var(--color-success)' }}>
                                        <CheckCircle size={28} style={{ margin: '0 auto var(--spacing-2) auto' }} />
                                        <span>Congratulations! Your resume is fully ATS-optimized and complete!</span>
                                    </div>
                                )}
                            </div>

                            <div className="form-navigation">
                                <button className="btn-secondary" onClick={() => setActiveTab('education')}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <div></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Live Preview Panel */}
                <div className="preview-container">
                    <div className="preview-controls">
                        <span className="template-select-label">Choose Layout Style:</span>
                        <select
                            className="form-input"
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(Number(e.target.value) as any)}
                            style={{ width: 'auto', minWidth: '180px', padding: 'var(--spacing-1) var(--spacing-2)' }}
                        >
                            <option value={1}>Template 1: Professional ATS</option>
                            <option value={2}>Template 2: Modern Professional</option>
                            <option value={3}>Template 3: Fresher Resume</option>
                            <option value={4}>Template 4: Experienced Prof.</option>
                            <option value={5}>Template 5: Developer Portfolio</option>
                        </select>
                    </div>

                    <div className="resume-paper-shadow">
                        <div
                            id="resume-print-area"
                            className={`resume-paper ${
                                selectedTemplate === 1 ? 'tpl-ats' :
                                selectedTemplate === 2 ? 'tpl-modern' :
                                selectedTemplate === 3 ? 'tpl-fresher' :
                                selectedTemplate === 4 ? 'tpl-experienced' : 'tpl-developer'
                            }`}
                        >
                            {/* Rendering dynamic templates based on state */}

                            {/* Template 1 & 4 Headings */}
                            {(selectedTemplate === 1 || selectedTemplate === 4) && (
                                <div>
                                    <div className="resume-name">{name || 'Your Name'}</div>
                                    <div className="resume-contact">
                                        {email && <span>{email}</span>}
                                        {phone && <span>{phone}</span>}
                                        {location && <span>{location}</span>}
                                        {linkedin && <span>{linkedin}</span>}
                                        {github && <span>{github}</span>}
                                        {portfolio && <span>{portfolio}</span>}
                                    </div>
                                </div>
                            )}

                            {/* Template 2 Header */}
                            {selectedTemplate === 2 && (
                                <header className="resume-header">
                                    <div className="resume-name">{name || 'Your Name'}</div>
                                    {targetRole && <div className="resume-title">{targetRole}</div>}
                                    <div className="resume-contact">
                                        {email && <span><Mail size={12} /> {email}</span>}
                                        {phone && <span><Phone size={12} /> {phone}</span>}
                                        {location && <span><MapPin size={12} /> {location}</span>}
                                        {linkedin && <span><Linkedin size={12} /> {linkedin}</span>}
                                        {github && <span><Github size={12} /> {github}</span>}
                                        {portfolio && <span><Globe size={12} /> {portfolio}</span>}
                                    </div>
                                </header>
                            )}

                            {/* Template 3 Header */}
                            {selectedTemplate === 3 && (
                                <div>
                                    <div className="resume-name">{name || 'Your Name'}</div>
                                    {targetRole && <div style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563', marginTop: '2px' }}>{targetRole}</div>}
                                    <div className="resume-contact">
                                        {email && <span>{email}</span>}
                                        {phone && <span>{phone}</span>}
                                        {location && <span>{location}</span>}
                                        {linkedin && <span>LinkedIn: {linkedin}</span>}
                                        {github && <span>GitHub: {github}</span>}
                                        {portfolio && <span>Portfolio: {portfolio}</span>}
                                    </div>
                                </div>
                            )}

                            {/* Template 5 Header */}
                            {selectedTemplate === 5 && (
                                <header className="resume-header">
                                    <div className="resume-name">{name || 'Your Name'}</div>
                                    {targetRole && <div style={{ fontSize: '15px', fontFamily: 'monospace', color: '#4f46e5', marginTop: '4px', fontWeight: 'bold' }}>{`// ${targetRole}`}</div>}
                                    <div className="resume-contact-grid">
                                        {email && <span>email: {email}</span>}
                                        {phone && <span>phone: {phone}</span>}
                                        {location && <span>loc: {location}</span>}
                                        {linkedin && <span>linkedin: {linkedin}</span>}
                                        {github && <span>github: {github}</span>}
                                        {portfolio && <span>web: {portfolio}</span>}
                                    </div>
                                </header>
                            )}

                            {/* Summary / Objective Section */}
                            {summary && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'profile' : 'Professional Summary'}
                                    </div>
                                    <div className="resume-body-text">{summary}</div>
                                </div>
                            )}

                            {/* Skills Section */}
                            {skills.length > 0 && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'skills' : 'Skills'}
                                    </div>
                                    <div className="resume-skills-inline">
                                        <strong>Skills & Frameworks: </strong>
                                        {skills.join(', ')}
                                    </div>
                                </div>
                            )}

                            {/* Work Experience Section */}
                            {experiences.length > 0 && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'experience' : 'Work Experience'}
                                    </div>
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="resume-experience-item">
                                            <div className="resume-item-header">
                                                <span>{exp.title || 'Job Title'}</span>
                                                <span>{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <div className="resume-item-subheader">
                                                <span>{exp.company || 'Company'}</span>
                                            </div>
                                            {exp.description && (
                                                <ul className="resume-bullet-list">
                                                    {exp.description.split('. ').map((bullet, idx) => {
                                                        const clean = bullet.trim().replace(/^\s*-\s*/, '');
                                                        if (!clean) return null;
                                                        return <li key={idx}>{clean.endsWith('.') ? clean : `${clean}.`}</li>;
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Projects Section */}
                            {projects.length > 0 && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'projects' : 'Projects'}
                                    </div>
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="resume-project-item">
                                            <div className="resume-item-header">
                                                <span>{proj.title || 'Project Title'}</span>
                                                {proj.techStack && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#64748b' }}>[{proj.techStack}]</span>}
                                            </div>
                                            {proj.description && (
                                                <ul className="resume-bullet-list">
                                                    {proj.description.split('. ').map((bullet, idx) => {
                                                        const clean = bullet.trim().replace(/^\s*-\s*/, '');
                                                        if (!clean) return null;
                                                        return <li key={idx}>{clean.endsWith('.') ? clean : `${clean}.`}</li>;
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Education Section */}
                            {educations.length > 0 && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'education' : 'Education'}
                                    </div>
                                    {educations.map((edu) => (
                                        <div key={edu.id} className="resume-education-item">
                                            <div className="resume-item-header">
                                                <span>{edu.degree || 'Degree'}</span>
                                                <span>{edu.endDate}</span>
                                            </div>
                                            <div className="resume-item-subheader">
                                                <span>{edu.institution || 'School'}</span>
                                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Certifications Section */}
                            {certifications.length > 0 && certifications.some(c => c.name) && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'certifications' : 'Certifications'}
                                    </div>
                                    {certifications.filter(c => c.name).map((cert) => (
                                        <div key={cert.id} style={{ fontSize: '13px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span><strong>{cert.name}</strong> - {cert.issuer}</span>
                                            <span>{cert.year}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Achievements Section */}
                            {achievements.length > 0 && achievements.some(a => a.description) && (
                                <div>
                                    <div className="resume-section-title">
                                        {selectedTemplate === 5 ? 'achievements' : 'Achievements'}
                                    </div>
                                    <ul className="resume-bullet-list">
                                        {achievements.filter(a => a.description).map((ach) => (
                                            <li key={ach.id} style={{ fontSize: '13px' }}>{ach.description}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilderPage;
