#!/bin/bash

# Global Engineering Skill: Environment Healer
# Fixes root-cause permission issues instead of using workarounds.

echo "🏥 Weightless Environment Doctor"
echo "==============================="

# 1. Check/Fix NPM Cache Permissions
NPM_CACHE="$HOME/.npm"
if [ -d "$NPM_CACHE" ]; then
    if [ ! -w "$NPM_CACHE" ]; then
        echo "❌ Permission Error: ~/.npm is not writable (likely root-owned)."
        echo "🔧 Fixing ownership (The Right Way)..."
        # We use strict variables to avoid any 'rm -rf /' accidents
        USER_ID=$(id -un)
        GROUP_ID=$(id -gn)
        
        # This requires sudo, but it fixes the machine for good.
        echo "   Please enter your password if prompted to reclaim .npm ownership."
        sudo chown -R $USER_ID:$GROUP_ID "$NPM_CACHE"
        
        if [ $? -eq 0 ]; then
            echo "✅ Fixed: ~/.npm is now owned by $USER_ID."
        else
            echo "💥 Failed to fix permissions. Please run manually: sudo chown -R $USER_ID:$GROUP_ID ~/.npm"
            exit 1
        fi
    else
        echo "✅ Check: ~/.npm permissions look good."
    fi
fi

# 2. Check Node Version
NODE_VER=$(node -v)
echo "✅ Node Version: $NODE_VER"

echo "==============================="
echo "🎉 Environment Validated. You can now build easily."
