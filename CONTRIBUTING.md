# Contributing to VibeDown

Thank you for your interest in contributing to VibeDown! We're excited to have you join our community. This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful, inclusive, and considerate in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/vibedown.git
   cd vibedown
   ```
3. **Set up the development environment**:
   ```bash
   npm install
   # or yarn install, pnpm install, bun install
   ```
4. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   ```

## Development Workflow

1. **Run the development server**:
   ```bash
   npm run dev
   # or yarn dev, pnpm dev, bun dev
   ```
2. **Make your changes** to the codebase
3. **Test your changes** thoroughly
4. **Commit your changes** with a clear, descriptive commit message:
   ```bash
   git commit -m "Add feature: description of the feature"
   ```
5. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** against the main repository

## Project Structure

```
vibedown/
├── app/                  # Next.js app directory
├── components/           # React components
│   ├── meditation-timer/ # Timer-related components
│   └── ...
├── hooks/                # Custom React hooks
│   ├── useAudio.ts       # Audio management hook
│   ├── useTimer.ts       # Timer functionality hook
│   └── ...
├── lib/                  # Utility libraries
├── public/               # Static assets
│   ├── audio/            # Audio files
│   └── ...
└── utils/                # Helper functions
```

## Component Guidelines

- Keep components focused on a single responsibility
- Use TypeScript for type safety
- Follow the existing code style and patterns
- Use Tailwind CSS for styling
- Ensure components are responsive and accessible

## Pull Request Process

1. Ensure your code follows the project's style and conventions
2. Update documentation if necessary
3. Include a clear description of the changes in your PR
4. Link any related issues in your PR description
5. Be responsive to feedback and be willing to make changes if requested

## Feature Requests and Bug Reports

If you have ideas for new features or have found a bug:

1. Check existing issues to see if it's already been reported
2. If not, create a new issue with a clear description
3. For bugs, include steps to reproduce, expected behavior, and actual behavior
4. For features, describe the feature and its benefits

## Audio Files

If you're contributing new audio files:

1. Ensure you have the rights to use and distribute the audio
2. Place audio files in the `/public/audio` directory
3. Use MP3 format for best compatibility
4. Keep file sizes reasonable (under 1MB if possible)
5. Document the source of the audio in your PR

## Testing

Before submitting a PR, test your changes:

- Test on different browsers (Chrome, Firefox, Safari)
- Test on both desktop and mobile views
- Ensure the timer functions correctly
- Verify audio playback works as expected

## License

By contributing to VibeDown, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

If you have any questions or need help, feel free to:

- Open an issue with your question
- Reach out to the maintainers

Thank you for contributing to VibeDown! Your efforts help make mindfulness more accessible to everyone.
